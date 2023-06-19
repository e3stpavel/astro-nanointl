import { afterEach, describe, expect, it, vi } from 'vitest'
import { useLocale } from '../src'

vi.mock('virtual:nanointl', () => ({
  locales: new Set(['en', 'ru']),
  defaultLocale: 'en',
  resources: {
    './locales/some-path/ru.json': { componentName: { message: 'Сообщение' } },
  },
}))

describe('useLocale composable', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

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

    // TODO: https://vitest.dev/guide/testing-types.html
  })
})
