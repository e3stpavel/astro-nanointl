import type { TransformFunction } from './types'

type ExtractParams<T extends string> = T extends `${infer Prefix}{${infer Param}}${infer Suffix}`
  ? ({ [key in Param]: string } & ExtractParams<Prefix> & ExtractParams<Suffix>)
  // eslint-disable-next-line ts/ban-types
  : {}

export function params<T extends string>(input: T): TransformFunction<T, ExtractParams<T>> {
  return (_locale, translation = input) => {
    return (params) => {
      let result = translation.toString()

      Object.keys(params).forEach(key =>
        result = result.replaceAll(`{${key}}`, (params as Record<string, string>)[key]),
      )

      return result
    }
  }
}
