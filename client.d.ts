declare module 'virtual:nanointl' {
  // type Locales<T extends ReadonlyArray<string>> = T
  
  export const locales: ReadonlySet<string>
  export const defaultLocale: string
  export const resources: Record<string, unknown>
}
