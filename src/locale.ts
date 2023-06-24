import type { Locale } from 'virtual:nanointl'
import { defaultLocale, locales, resources } from 'virtual:nanointl'

export type TSchema = Record<string, string>
export type FunctionParameters<T> = [componentName: string, baseTranslation: T]

interface UseLocaleReturnType<T extends TSchema> {
  locale: Locale
  t: T
}

export function useLocale<T extends TSchema>(
  locale: Locale | undefined = defaultLocale,
  ...[componentName, baseTranslation]: FunctionParameters<T>
): Partial<UseLocaleReturnType<T>> {
  if (!locales.has(locale))
    return {}

  if (locale === defaultLocale)
    return { locale, t: baseTranslation }

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

      return result === locale
    })
    ?.at(1)

  if (translation === undefined || translation === null)
    return { locale }

  return { locale, t: translation[componentName as keyof typeof translation] as T }
}

// const {t, locale} = useLocale('aa', 'ahsh', { h: 'ksk'})
