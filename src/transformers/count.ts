import type { TransformFunction } from './types'

interface Input extends Partial<Record<Intl.LDMLPluralRule, string>> {
  many: string
}

// TODO: Intl options for number?

/**
 * Use it when you need to introduce pluralization
 *
 * @example
 * ```typescript
 * const t = useTranslations({
 *  stars: count({
 *    one: 'a star',
 *    many: '{count} stars'
 *  })
 * }, translations)
 *
 * t.count(1) // prints `a star`
 * t.count(3) // prints `3 stars`
 * ```
 */
export function count(input: Input): TransformFunction<Input, number> {
  return (locale, translation = input) => {
    return (number) => {
      let form = new Intl.PluralRules(locale).select(number)

      if (!(form in translation))
        form = 'many'

      return translation[form]!
        .replaceAll('{count}', number.toLocaleString(locale))
    }
  }
}
