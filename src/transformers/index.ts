type Args<T> = T extends Array<any> ? T : [T]

export type TranslationFunction<T> = (...args: Args<T>) => string

export type TransformFunction<TInput, TArgs> = (locale: string, translation?: TInput) => TranslationFunction<TArgs>
