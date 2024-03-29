import type { TransformFunction } from './types'

type ExtractArgs<T extends string> = T extends `${infer Prefix}%${number}${infer Suffix}`
  ? [string, ...ExtractArgs<Prefix>, ...ExtractArgs<Suffix>]
  : []

export function args<T extends string>(input: T): TransformFunction<T, ExtractArgs<T>> {
  return (_locale, translation = input) => {
    return (...args) => {
      return translation.replaceAll(/%\d/g, substring =>
        args[+substring.slice(1) - 1])
    }
  }
}
