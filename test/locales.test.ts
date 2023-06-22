import { describe, expect, it } from 'vitest'
import { useLocales } from '../src'

describe('useLocales util', () => {
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
