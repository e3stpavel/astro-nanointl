import { afterEach, describe, expect, it, vi } from 'vitest'
import { useLocales } from '../src'

vi.mock('virtual:nanointl', () => ({
  locales: new Set(['en', 'ru']),
  defaultLocale: 'en',
  resources: {
    './locales/some-path/ru.json': { componentName: { message: 'Сообщение' } },
  },
}))

describe('useLocales util', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return locales and default one', () => {
    const result = useLocales()

    expect(result).toBeDefined()
    expect(result).toHaveProperty('defaultLocale')
    expect(result).toHaveProperty('locales')

    expect(result.defaultLocale).toBe('en')
    expect(result.locales).toStrictEqual(['en', 'ru'])
  })

  it.todo('should throw error if \'locales\' are empty', () => {
  })
})
