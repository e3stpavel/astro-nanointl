type ArrayNonEmpty<T> = [T, ...T[]]

declare module 'virtual:nanointl' {
  type Locales = Readonly<ArrayNonEmpty<string>>
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
