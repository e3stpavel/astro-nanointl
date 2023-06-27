import type { Locale } from 'virtual:nanointl'
import { defaultLocale, locales, resources } from 'virtual:nanointl'

export type Schema = Record<string, string | ((...args: any[]) => string)>
export type FunctionParameters<T> = [componentName: string, baseTranslation: T]

interface UseLocaleReturnType<T extends Schema> {
  locale: Locale
  t: T
}

interface Transformer {
  transform: (locale: Locale, translation: string | object, args: Array<unknown>) => string
  input: string
}

export function useLocale<TSchema extends Schema, TKey extends keyof TSchema>(
  locale: Locale | undefined = defaultLocale,
  ...[componentName, baseTranslation]: FunctionParameters<TSchema>
): Partial<UseLocaleReturnType<TSchema>> {
  if (!locales.has(locale))
    return {}

  let t: TSchema
  const regex = new RegExp(`(?:\/(${[...locales].join('|')})\.)`)

  if (locale !== defaultLocale) {
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

    if (!translation)
      return { locale }

    t = translation[componentName as keyof typeof translation]
  }
  else {
    t = Object.fromEntries(
      Object.entries(baseTranslation).map(([key, value]) => {
        if (isTransformer(value)) {
          return [
            key, value.input,
          ]
        }

        return [
          key, value,
        ]
      }),
    ) as TSchema
  }

  (Object.keys(t) as Array<TKey>).forEach((key) => {
    const value: unknown = baseTranslation[key]

    if (!isTransformer(value))
      return

    const input = t[key] as string | object
    t[key] = ((...args) => value.transform(locale, input, args)) as TSchema[TKey]
  })

  return { locale, t }
}

function isTransformer(value: unknown): value is Transformer {
  if (
    typeof value === 'object'
    && value
    && 'transform' in value
    && 'input' in value
    && typeof value.transform === 'function'
    && (typeof value.input === 'object' || typeof value.input === 'string')
    && value.transform
    && value.input
  )
    return true

  return false
}
