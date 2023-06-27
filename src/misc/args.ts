import { strings, transform } from '@nanostores/i18n'

// import type { TranslationFunction, TranslationFunctionAlternatives } from '@nanostores/i18n/create-i18n'

/**
 * Adds arguments to translation strings.
 *
 * ```ts
 * ---
 * import { args, useLocale } from 'astro-nanointl/utils'
 *
 * const { t } = useLocale('en', 'withArguments', {
 *   arguments: args('Hello, %1')
 * })
 *
 * ---
 *
 * <p>{ t.arguments('John') }</p>
 *
 * ```
 *
 * @param input Template string.
 * @return Transform for translation.
 */
export const args = transform((locale, translation, ...kwargs) => {
  return strings(translation, str =>
    str.replace(/%\d/g, pattern => kwargs[+pattern.slice(1)]),
  )
})
// TODO: types
