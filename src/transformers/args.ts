import type { TransformFunction } from './types'

type ExtractArgs<T extends string> = T extends `${infer Prefix}%${number}${infer Suffix}`
  ? [string, ...ExtractArgs<Prefix>, ...ExtractArgs<Suffix>]
  : []

/**
 * Useful when you just need to interpolate some values into translation string
 *
 * The limit is 9 arguments
 *
 * @example
 * ```typescript
 * const t = useTranslations({
 *  myNameIs: args('Hey, my name is %1')
 * }, translations)
 *
 * t.myNameIs('John') // prints `Hey, my name is John`
 * ```
 */
export function args<T extends string>(input: T): TransformFunction<T, ExtractArgs<T>> {
  return (_locale, translation = input) => {
    return (...args) => {
      return translation.replaceAll(/%\d/g, substring =>
        args[+substring.slice(1) - 1] ?? substring)
    }
  }
}
