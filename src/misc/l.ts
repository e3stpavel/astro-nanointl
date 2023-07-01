import type { Locale } from 'virtual:nanointl'
import { locales } from 'virtual:nanointl'

import type { FunctionParameters, Schema } from '../locale'
import { useLocale } from '../locale'

interface LFunctionReturnType<T extends Schema> extends Record<Locale, T> { }

/**
 * Returns the list of all available translations.
 *
 * Primarily used for passing the translations to the UI Frameworks components as props.
 *
 * @param param0 - Function arguments
 * @returns List of all available translations for each locale
 */
export function l<T extends Schema>(...[componentName, baseTranslation]: FunctionParameters<T>): LFunctionReturnType<T> {
  const map = new Map<Locale, T>()

  locales.forEach((locale) => {
    const { t } = useLocale(locale, componentName, baseTranslation)
    if (!t)
      return

    map.set(locale, t)
  })

  return Object.fromEntries(map)
}
