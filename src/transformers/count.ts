import type { TransformFunction } from './types'

interface Input extends Partial<Record<Intl.LDMLPluralRule, string>> {
  many: string
}

// TODO: Intl options for number?

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
