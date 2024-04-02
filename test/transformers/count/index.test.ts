import { it } from 'vitest'
import { useTranslations } from '~/index'
import { count } from '~/transformers'

const schema = {
  one: 'star',
  many: 'stars',
}

const translations = {
  one: 'звезда',
  few: 'звезды',
  many: 'звезд',
}

it('creates translation function', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations({
    count: count(schema),
  }, options)

  expect(t).toHaveProperty('count')
  expect(t.count).toBeTypeOf('function')
})

it('selects correct translation', ({ expect }) => {
  const options = { data: { count: translations }, locale: 'ru' }

  const t = useTranslations({
    count: count(schema),
  }, options)

  expect(t.count(1)).toBe('звезда')
  expect(t.count(2)).toBe('звезды')
  expect(t.count(27)).toBe('звезд')
})

it('selects correct translation when fallback', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations({
    count: count(schema),
  }, options)

  expect(t.count(1)).toBe('star')
  expect(t.count(2)).toBe('stars')
  expect(t.count(27)).toBe('stars')
})

it('interpolates a number into translation', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }
  const schemaWithInterpolation = Object.fromEntries(
    Object.keys(schema).map(key => ([
      key,
      `{count} ${schema[key as keyof typeof schema]} {count}`,
    ])),
  )

  const t = useTranslations({
    count: count(schemaWithInterpolation as typeof schema),
  }, options)

  expect(t.count(1)).toBe('1 star 1')
  expect(t.count(2)).toBe('2 stars 2')
  expect(t.count(27)).toBe('27 stars 27')
})

it('uses \'many\' as fallback for incorrect number', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations({
    count: count(schema),
  }, options)

  expect(t.count(Number.NaN)).toBe(schema.many)
})
