import type { TransformFunction, TranslationFunction } from './transformers'

export { format } from './misc/format'

// TODO: infer content collection schema type
type Translations = Record<string, string> | undefined

interface Options {
  data: Translations
  locale: string
}

type TranslationSchema = Record<string, string | TransformFunction<any, any>>

type TranslatedSchema<T> = {
  [K in keyof T]: T[K] extends TransformFunction<any, infer A> ? TranslationFunction<A> : T[K]
}

export function useTranslations<T extends TranslationSchema>(schema: T, options: Options): TranslatedSchema<T> {
  const translations = options.data

  return Object.fromEntries(
    Object.keys(schema).map((key) => {
      const value = schema[key]
      const translation = translations?.[key]

      if (typeof value === 'string')
        return [key, translation ?? value]

      return [key, value(options.locale, translation)]
    })
  )
}
