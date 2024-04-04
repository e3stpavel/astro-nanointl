import { describe, expectTypeOf, it } from 'vitest'
import { useTranslations } from 'src/index'
import { args } from 'src/transformers'

const t = useTranslations({
  args: args('Good %1, %2!'),
}, { data: undefined, locale: 'en' })

describe('translation function', () => {
  it('is function', () => {
    expectTypeOf(t.args).toBeFunction()
  })

  it('accepts string arguments', () => {
    expectTypeOf(t.args).parameters.toEqualTypeOf<[string, string]>()
    expectTypeOf(t.args).toBeCallableWith('morning', 'Andrew')
  })

  it('returns string', () => {
    expectTypeOf(t.args).returns.toBeString()
  })
})

describe('transform function', () => {
  it('is function', () => {
    expectTypeOf(args).toBeFunction()
  })

  it('requires string', () => {
    expectTypeOf(args).parameters.toEqualTypeOf<[string]>()
  })
})
