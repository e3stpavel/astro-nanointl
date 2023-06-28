import { strings, transform } from '@nanostores/i18n'
import type { TranslationFunction } from '@nanostores/i18n/create-i18n'

interface Args {
  /**
   * Adds arguments to translation strings.
   *
   * ```ts
   * ---
   * import { args, useLocale } from 'astro-nanointl/utils'
   *
   * const { t } = useLocale('en', 'withArguments', {
   *   arguments: args<[string, string]>('Hello, %1! Nice to meet you %2')
   * })
   * ---
   *
   * <p>{ t.arguments('John', 'again') }</p>
   *
   * ```
   *
   * @param input Template string.
   * @return Transform for translation.
   */
  <Parameters extends Array<string | number>>(
    input: string
  ): TranslationFunction<[...Parameters], string>
}

export const args: Args = transform((locale, translation, ...kwargs) => {
  return strings(translation, str =>
    str.replace(/%\d/g, pattern =>
      String(kwargs[+pattern.slice(1) - 1]),
    ),
  )
})
