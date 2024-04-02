import { it } from 'vitest'
import { useTranslations } from '~/index'
import { count } from '~/transformers'

const schema = {
  count: count({
    one: 'star',
    many: 'stars',
  }),
}

const translations = {
  count: {
    one: 'звезда',
    few: 'звезды',
    many: 'звезд',
  },
}

it('creates translation function', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)

  expect(t).toHaveProperty('count')
  expect(t.count).toBeTypeOf('function')
})

it('selects correct translation', ({ expect }) => {
  const options = { data: translations, locale: 'ru' }

  const t = useTranslations(schema, options)

  expect(t.count(1)).toBe('звезда')
  expect(t.count(2)).toBe('звезды')
  expect(t.count(27)).toBe('звезд')
})

it('selects correct translation when fallback', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)

  expect(t.count(1)).toBe('star')
  expect(t.count(2)).toBe('stars')
  expect(t.count(27)).toBe('stars')
})

it('interpolates a number into translation', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }
  const schemaWithInterpolation = {
    count: count({
      one: '{count} star {count}',
      many: '{count} stars {count}',
    }),
  }

  const t = useTranslations(schemaWithInterpolation, options)

  expect(t.count(1)).toBe('1 star 1')
  expect(t.count(2)).toBe('2 stars 2')
  expect(t.count(27)).toBe('27 stars 27')
})

it('uses \'many\' as fallback for incorrect number', ({ expect }) => {
  const options = { data: translations, locale: 'ru' }

  const t = useTranslations(schema, options)

  expect(t.count(Number.NaN)).toBe(translations.count.many)
})
