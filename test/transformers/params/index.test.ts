import { expect, it } from 'vitest'
import { useTranslations } from '~/index'
import { params } from '~/transformers'

// do not use `as const` as it will make it harder to test because of strict types
const translations = {
  params: 'Закажите этот классный {product} прямо сейчас! Только {productsLeft} осталось в наличии',
  value: 'Order this fancy {product} right now! {productsLeft} left in stock',
}

const schema = {
  params: params(translations.value),
}

const product = 'Macbook'
const productsLeft = (7).toString() // weird tbh

it('creates translation function', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)

  expect(t).toHaveProperty('params')
  expect(t.params).toBeTypeOf('function')
})

it('selects correct translation', ({ expect }) => {
  const options = { data: translations, locale: 'ru' }

  const t = useTranslations(schema, options)
  const result = t.params({ product, productsLeft })

  expect(result).toContain(product)
  expect(result).toContain(productsLeft)
  expect(result).toContain(translations.params.substring(0, 16))
})

it('selects correct translation when fallback', ({ expect }) => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)
  const result = t.params({ product, productsLeft })

  expect(result).toContain(product)
  expect(result).toContain(productsLeft)
  expect(result).toContain(translations.value.substring(0, 16))
})

it('ignores unnecessary params', () => {
  const randomValue = 'value'
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)
  const result = t.params({ product, productsLeft, randomValue })

  expect(result).not.toContain(randomValue)
})

it('skips interpolation if no value is presented', () => {
  const options = { data: undefined, locale: 'en' }

  const t = useTranslations(schema, options)
  const result = t.params({ product })

  expect(result).toContain(product)
  expect(result).not.toContain(productsLeft)
  expect(result).toContain('{productsLeft}')
})
