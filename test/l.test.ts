import { describe, expect, it } from 'vitest'
import { useLocales } from '../src/locales'

describe('l function', () => {
  it('should return all translations', () => {
    const translations = useLocales().l('componentName', {
      message: 'Message',
    })

    expect(translations).toBeDefined()
    expect(translations).toHaveProperty('en', {
      message: 'Message',
    })
    expect(translations).toHaveProperty('ru', {
      message: 'Сообщение',
    })
  })

  it('should not find translation for other than default locale', () => {
    const translations = useLocales().l('not-exists', {
      something: 'Something',
    })

    expect(translations).toBeDefined()
    expect(translations).toHaveProperty('en', {
      something: 'Something',
    })

    expect(translations).not.toHaveProperty('ru')
  })
})
