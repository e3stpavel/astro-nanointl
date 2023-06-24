import type { Locale, Locales } from 'virtual:nanointl'
import { defaultLocale, locales } from 'virtual:nanointl'
import { l } from './l'

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

export function useLocales(): UseLocalesReturnType {
  return {
    locales: castToArrayNonEmpty([...locales]),
    defaultLocale,
    l,
  }
}
