import { it } from 'vitest'
import { useTranslations } from '~/index'
import { args } from '~/transformers'

const translations = {
  args: 'Добро пожаловать на борт! Скажите привет %1, %2 и %3',
  value: 'Welcome aboard! Say hello to %1, %2 and %3',
} as const

const schema = {
  args: args(translations.value),
}

const names = ['Sally', 'John', 'George']

it('creates translation function', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)

  expect(t).toHaveProperty('args')
  expect(t.args).toBeTypeOf('function')
})

it('selects correct translation', ({ expect }) => {
  const options = { data: translations, locale: 'ru' }

  const t = useTranslations(schema, options)
  // @ts-expect-error for testing purposes, should not be used by user
  const result = t.args(...names)

  names.forEach(name =>
    expect(result).toContain(name))
  expect(result).toContain(translations.args.substring(0, 16))
})

it('selects correct translation when fallback', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)
  // @ts-expect-error for testing purposes, should not be used by user
  const result = t.args(...names)

  names.forEach(name =>
    expect(result).toContain(name))
  expect(result).toContain(translations.value.substring(0, 16))
})

it('ignores unnecessary args', ({ expect }) => {
  const moreNames = [...names, 'Andrew']
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)
  // @ts-expect-error for testing purposes, should not be used by user
  const result = t.args(...moreNames)

  names.forEach(name =>
    expect(result).toContain(name))
  expect(result).not.toContain(moreNames.at(-1))
})

it('skips interpolation if no value is presented', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)
  // @ts-expect-error for testing purposes
  const result = t.args('Andrew')

  names.forEach((name, i) => {
    expect(result).not.toContain(name)

    if (i > 0)
      expect(result).toContain(`%${i + 1}`)
  })
  expect(result).toContain('Andrew')
})

it('ignores \'%0\'', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations({ args: args('Hey %0! What\'s your %1?') }, options)
  const result = t.args('John', 'job')

  expect(result).toContain('%0')
  expect(result).toContain('John')
  expect(result).not.toContain('job')
})

it('breaks if index is more than 9', ({ expect }) => {
  const translation = Array.from({ length: 11 }, (_, i) => `%${i + 1}`).join(',')
  const strings = Array.from({ length: 11 }, () => 'a')

  const options = { data: undefined, locale: 'en' }

  const t = useTranslations({ args: args(translation) }, options)
  // @ts-expect-error for testing purposes, should not be used by user
  const result = t.args(...strings)

  result.split(',').forEach((value, i) => {
    if (i >= 9) {
      expect(value).not.toBe('a')
      return
    }

    expect(value).toBe('a')
  })
})
