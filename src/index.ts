import type { Translations } from './schema'
import type { TransformFunction, TranslationFunction } from './transformers/types'

interface Options {
  /**
   * Contains translations to use
   *
   * Can be `undefined`, otherwise must match the translations schema
   */
  data: Translations | undefined

  /**
   * Contains the language of translations
   *
   * Must be compatible with [`Intl` locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)
   */
  locale: string
}

type TranslationSchema = Record<string, string | TransformFunction<any, any>>

type TranslatedSchema<T> = {
  [K in keyof T]: T[K] extends TransformFunction<any, infer A> ? TranslationFunction<A> : T[K]
}

/**
 * Translates the schema using provided translations and locale
 * @param schema Represents your default language translations and is used to seamlessly match your other translations against it
 * @param options Translations themselves
 * @returns Schema translated using provided translations and locale
 */
export function useTranslations<T extends TranslationSchema>(schema: T, options: Options): TranslatedSchema<T> {
  const translations = options.data

  return Object.fromEntries(
    Object.keys(schema).map((key) => {
      const value = schema[key]
      const translation = translations?.[key]

      if (typeof value === 'string')
        return [key, translation ?? value]

      return [key, value(options.locale, translation)]
    }),
  )
}
