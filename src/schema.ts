import { z } from 'astro/zod'

/**
 * [Content Collections](https://docs.astro.build/en/guides/content-collections/)
 * collection schema to validate raw translations
 */
export const translationsSchema = z.record(
  z.string().min(1),
  z.union([
    z.string(),
    z.record(
      z.enum([
        'zero',
        'one',
        'two',
        'few',
        'many',
        'other',
      ]),
      z.string(),
    ).refine(value => 'many' in value, {
      message: 'Key \'many\' is missing, though required',
    }),
  ]),
)

/**
 * Represents raw translations
 */
export type Translations = z.infer<typeof translationsSchema>
