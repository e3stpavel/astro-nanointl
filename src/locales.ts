import type { Locale, Locales } from 'virtual:nanointl'
import { defaultLocale, locales } from 'virtual:nanointl'
import { l } from './misc/l'

interface UseLocalesReturnType {
  locales: Locales
  defaultLocale: Locale
  l: typeof l
}

function castToArrayNonEmpty<T>(array: Array<T>): ArrayNonEmpty<T> {
  const arrayIsNonEmpty = (a: Array<T>): a is ArrayNonEmpty<T> => a.length > 0

  if (arrayIsNonEmpty(array))
    return array

  throw new Error(`Array '${JSON.stringify(array)}' does not have any locales.`)
}

/**
 * Returns all the available locales and other things.
 *
 * @returns An object containing:
 *  - Non-empty array of all available locales specified by user on integration setup
 *  - Default locale, either explicitly specified by user or the first item of locales array
 *  - {@link l} function
 */
export function useLocales(): UseLocalesReturnType {
  return {
    locales: castToArrayNonEmpty([...locales]),
    defaultLocale,
    l,
  }
}

export {
  useLocales as useTranslations,
}
