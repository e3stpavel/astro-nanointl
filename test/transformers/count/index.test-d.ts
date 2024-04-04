import { describe, expectTypeOf, it } from 'vitest'
import { useTranslations } from 'src/index'
import { count } from 'src/transformers'

const t = useTranslations({
  count: count({ many: 'stars' }),
}, { data: undefined, locale: 'en' })

describe('translation function', () => {
  it('is function', () => {
    expectTypeOf(t.count).toBeFunction()
  })

  it('accepts number argument', () => {
    expectTypeOf(t.count).parameters.toEqualTypeOf<[number]>()
  })

  it('returns string', () => {
    expectTypeOf(t.count).returns.toBeString()
  })
})

describe('transform function', () => {
  it('is function', () => {
    expectTypeOf(count).toBeFunction()
  })

  it('requires \'many\' key', () => {
    expectTypeOf(count).parameter(0).toBeObject()
    expectTypeOf(count).parameter(0).toHaveProperty('many').toBeString()

    expectTypeOf(count).toBeCallableWith({ many: 'star' })
  })

  it('doesn\'t accept other keys', () => {
    expectTypeOf(count).parameter(0).toHaveProperty('one').toBeNullable()
    expectTypeOf(count).parameter(0).toHaveProperty('other').toBeNullable()

    expectTypeOf(count).parameter(0).not.toHaveProperty('random')
    expectTypeOf(count).parameter(0).not.toHaveProperty('abc')

    expectTypeOf(count).parameter(0).not.toHaveProperty(1)
    expectTypeOf(count).parameter(0).not.toHaveProperty(20)
  })
})
