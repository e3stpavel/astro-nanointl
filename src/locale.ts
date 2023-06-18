import { defaultLocale, locales, resources } from 'virtual:nanointl'

type TSchema = Record<string, string>
type Locale = typeof defaultLocale
interface UseLocaleReturnType<T extends TSchema> {
  locale: Locale
  t: T
}

export function useLocale<T extends TSchema>(locale: Locale, componentName: string, baseTranslation: T): Partial<UseLocaleReturnType<T>>
export function useLocale<T extends TSchema>(url: URL, componentName: string, baseTranslation: T): Partial<UseLocaleReturnType<T>>
export function useLocale<T extends TSchema>(value: Locale | URL, componentName: string, baseTranslation: T) {
  if (value instanceof URL) {
    const regex = new RegExp(`(?:\/(${[...locales].join('|')})\/)`)
    const array = regex.exec(value.pathname)
    if (array === null)
      return {}

    const result = array.at(1)
    if (result === undefined)
      return {}

    value = result as Locale
  }

  if (!locales.has(value))
    return {}

  if (value === defaultLocale)
    return { locale: value, t: baseTranslation }

  const regex = new RegExp(`(?:\/(${[...locales].join('|')})\.)`)
  const translation = Object.entries(resources)
    .find(([path, resource]) => {
      if (typeof resource !== 'object' || !resource || !(componentName in resource))
        return false

      const array = regex.exec(path)
      if (array === null)
        return false

      const result = array.at(1)
      if (result === undefined)
        return false

      return result === value
    })
    ?.at(1)

  if (translation === undefined || translation === null)
    return { locale: value }

  return { locale: value, t: translation[componentName as keyof typeof translation] as T }
}
