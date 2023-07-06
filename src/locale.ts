import type { Locale } from 'virtual:nanointl'
import { defaultLocale, locales } from 'virtual:nanointl'
import { resources } from './misc/resources'
import { format } from './misc/format'

export type Schema = Record<string, string | ((...args: any[]) => string)>
export type FunctionParameters<T> = [
  /**
   * Name of the exact part of the translation
   */
  componentName: string,
  /**
   * An object used for TypeScript types and translation functions (`count()`, `params()`, etc)
   */
  baseTranslation: T,
]

interface UseLocaleReturnType<T extends Schema> {
  locale: Locale
  t: T
  f: ReturnType<typeof format>
}

interface Transformer {
  transform: (locale: Locale, translation: string | object, args: Array<unknown>) => string
  input: string
}

/**
 * Uses provided `locale` to return formatting functions and translation according to the `baseTranslation`.
 *
 * If provided `locale` was `undefined` it is treated as default one, otherwise checks for user defined locales array.
 *
 * @param locale - Locale to use for translation
 * @param param1 - Function arguments
 * @returns An object containing:
 *  - Translation for specific locale, `t`
 *  - Parsed locale
 *  - Formatting functions for provided locale, `f`
 */
export function useLocale<TSchema extends Schema>(
  locale: Locale | undefined = defaultLocale,
  ...[componentName, baseTranslation]: FunctionParameters<TSchema>
): Partial<UseLocaleReturnType<TSchema>> {
  if (locale === undefined || locale === defaultLocale) {
    // use base translation
    const entries = Object.keys(baseTranslation).map((key) => {
      const value = baseTranslation[key] as string | Transformer

      if (typeof value === 'string')
        return [key, value]

      return [
        key, (...args: unknown[]) => value.transform(locale, value.input, args),
      ]
    })

    return { locale, t: Object.fromEntries(entries), f: format(locale) }
  }

  if (!locales.has(locale))
    return {}

  // find the translation
  const regex = new RegExp(`(?:\/(${[...locales].join('|')})\.)`)
  const found = Object.entries(resources)
    .find(([path, resource]) => {
      if (typeof resource !== 'object' || !resource || !(componentName in resource))
        return false

      const array = regex.exec(path)
      if (array === null)
        return false

      const result = array.at(1)
      if (!result)
        return false

      return result === locale
    })
    ?.at(1)

  if (!found)
    return { locale }

  // use base translation as guide to format the found one
  const entries = Object.entries(found[componentName as keyof typeof found])
    .map(([key, value]) => {
      const baseTranslationValue = baseTranslation[key] as string | Transformer | undefined
      if (!baseTranslationValue)
        return []

      if ((typeof value !== 'string' && typeof value !== 'object') || value === null)
        return []

      if (typeof baseTranslationValue === 'string')
        return [key, value]

      return [
        key, (...args: unknown[]) => baseTranslationValue.transform(locale, value, args),
      ]
    })
    .filter(value => value.length > 0)

  return { locale, t: Object.fromEntries(entries), f: format(locale) }
}
