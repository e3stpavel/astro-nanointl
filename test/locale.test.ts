import { describe, expect, it } from 'vitest'
import { count, params, useLocale } from '../src'

describe('useLocale util', () => {
  it('should return if no locale supported', () => {
    const result = useLocale('fr', '', {})

    expect(result).toBeDefined()
    // expect(result).toHaveProperty('locale')
    // expect(result).toHaveProperty('t')

    expect(result.locale).toBeUndefined()
    expect(result.t).toBeUndefined()
  })

  it('should return base translation and default locale when \'undefined\'', () => {
    const result = useLocale(undefined, '', {})

    expect(result).toBeDefined()

    expect(result).toHaveProperty('locale')
    expect(result.locale).toBeDefined()
    expect(result.locale).toBe('en')

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()
    expect(result.t).toEqual({})
  })

  it('should return base translation if locale is default', () => {
    const result = useLocale('en', '', {})

    expect(result).toBeDefined()

    expect(result).toHaveProperty('locale')
    expect(result.locale).toBeDefined()
    expect(result.locale).toBe('en')

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()
    expect(result.t).toEqual({})
  })

  it('should find translation from \'resources\'', () => {
    const result = useLocale('ru', 'componentName', {
      message: 'Message',
    })

    expect(result).toBeDefined()

    expect(result).toHaveProperty('locale')
    expect(result.locale).toBeDefined()
    expect(result.locale).toBe('ru')

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()
    expect(result.t).toStrictEqual({ message: 'Сообщение' })
  })

  it('should use \'params\' transformer', () => {
    const result = useLocale('en', 'transformers', {
      parameters: params<{ name: string }>('Hello from {name}'),
    })

    expect(result).toBeDefined()

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()

    expect(result.t).toHaveProperty('parameters')
    expect(result.t!.parameters).toBeDefined()
    expect(result.t!.parameters({ name: 'Joe' })).toBe('Hello from Joe')
  })

  it('should use \'params\' transformer for other locale', () => {
    const result = useLocale('ru', 'transformers', {
      parameters: params<{ name: string }>('Hello from {name}'),
    })

    expect(result).toBeDefined()

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()

    expect(result.t).toHaveProperty('parameters')
    expect(result.t!.parameters).toBeDefined()
    expect(result.t!.parameters({ name: 'Joe' })).toBe('Привет от Joe')
  })

  it('should use \'count\' transformer', () => {
    const result = useLocale('en', 'transformers', {
      pluralization: count({
        one: 'a robot',
        many: '{count} robots',
      }),
    })

    expect(result).toBeDefined()

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()

    expect(result.t).toHaveProperty('pluralization')
    expect(result.t!.pluralization).toBeDefined()

    expect(result.t!.pluralization(1)).toBe('a robot')
    expect(result.t!.pluralization(5)).toBe('5 robots')
  })

  it('should use \'count\' transformer for other locale', () => {
    const result = useLocale('ru', 'transformers', {
      pluralization: count({
        one: 'a robot',
        many: '{count} robots',
      }),
    })

    expect(result).toBeDefined()

    expect(result).toHaveProperty('t')
    expect(result.t).toBeDefined()

    expect(result.t).toHaveProperty('pluralization')
    expect(result.t!.pluralization).toBeDefined()

    expect(result.t!.pluralization(1)).toBe('просто робот')
    expect(result.t!.pluralization(2)).toBe('2 робота')
    expect(result.t!.pluralization(5)).toBe('5 роботов')
  })
})
