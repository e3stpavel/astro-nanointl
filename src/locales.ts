import { defaultLocale, locales } from 'virtual:nanointl'

type Locale = typeof defaultLocale
interface UseLocalesReturnType {
  locales: ReadonlyArray<Locale>
  defaultLocale: Locale
}

export function useLocales(): UseLocalesReturnType {
  return {
    locales: [...locales],
    defaultLocale,
    // TODO: l function
  }
}
