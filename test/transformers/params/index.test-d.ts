import { describe, expectTypeOf, it } from 'vitest'
import { useTranslations } from 'src/index'
import { params } from 'src/transformers'

const t = useTranslations({
  params: params('Good {timeOfDay}, {name}!'),
}, { data: undefined, locale: 'en' })

describe('translation function', () => {
  it('is function', () => {
    expectTypeOf(t.params).toBeFunction()
  })

  it('accepts object as argument with two typed properties', () => {
    expectTypeOf(t.params).parameter(0).toBeObject()
    expectTypeOf(t.params).parameter(0).toHaveProperty('timeOfDay').toBeString()
    expectTypeOf(t.params).parameter(0).toHaveProperty('name').toBeString()

    expectTypeOf(t.params).toBeCallableWith({ timeOfDay: 'morning', name: 'John' })
  })

  it('doesn\'t accept object with other properties as argument', () => {
    expectTypeOf(t.params).parameter(0).not.toHaveProperty('random')
    expectTypeOf(t.params).parameter(0).not.toHaveProperty('abc')

    expectTypeOf(t.params).parameter(0).not.toHaveProperty(1)
    expectTypeOf(t.params).parameter(0).not.toHaveProperty(91)
  })

  it('returns string', () => {
    expectTypeOf(t.params).returns.toBeString()
  })
})

describe('transform function', () => {
  it('is function', () => {
    expectTypeOf(params).toBeFunction()
  })

  it('requires string', () => {
    expectTypeOf(params).parameters.toEqualTypeOf<[string]>()
  })
})
