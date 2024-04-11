import type { TransformFunction } from './types'

type ExtractParams<T extends string> = T extends `${infer Prefix}{${infer Param}}${infer Suffix}`
  ? ({ [key in Param]: string } | ExtractParams<Prefix> | ExtractParams<Suffix>)
  : never

type AllRequired<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

/**
 * Particularly useful when you have an object or many different parameters that need to be included in the translation
 *
 * @example
 * ```typescript
 * const t = useTranslations({
 *  greeting: params('Good {timeOfDay}, {username}!'),
 * }, translations)
 *
 * t.greeting({ timeOfDay: 'morning', name: '@eskozloi' }) // prints `Good morning, @eskozloi!`
 * ```
 */
export function params<T extends string>(input: T): TransformFunction<T, AllRequired<ExtractParams<T>>> {
  // @ts-expect-error source has the first element
  return (_locale, translation = input) => {
    return (params) => {
      let result = translation.toString()

      Object.keys(params).forEach(key =>
        result = result.replaceAll(`{${key}}`, params[key]),
      )

      return result
    }
  }
}
