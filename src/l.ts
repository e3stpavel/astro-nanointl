import type { Locale } from 'virtual:nanointl'
import { locales } from 'virtual:nanointl'

import type { FunctionParameters, TSchema } from './locale'
import { useLocale } from './locale'

interface LFunctionReturnType<T extends TSchema> {
  [locale: Locale]: T
}

export function l<T extends TSchema>(...[componentName, baseTranslation]: FunctionParameters<T>): LFunctionReturnType<T> {
  const map = new Map<Locale, T>()

  locales.forEach((locale) => {
    const { t } = useLocale(locale, componentName, baseTranslation)
    if (!t)
      return

    map.set(locale, t)
  })

  return Object.fromEntries(map)
}
