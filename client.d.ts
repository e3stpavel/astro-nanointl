type ArrayNonEmpty<T> = [T, ...T[]]

/**
 * Interface for users to override the default types
 */
interface UserDefinedIntl {
  locales?: ReadonlyArray<string>
}

declare module 'virtual:nanointl' {
  type Locales = UserDefinedIntl['locales'] extends ReadonlyArray<string> ? UserDefinedIntl['locales'] : Readonly<ArrayNonEmpty<string>>
  type Locale = Locales[number]
  
  const locales: ReadonlySet<Locale>
  const defaultLocale: Locale
  const resources: Record<string, unknown>
}

declare namespace App {
  interface Locals {
    locale?: import('virtual:nanointl').Locale
  }
}
