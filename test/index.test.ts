import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import { useTranslations } from '~/index'

describe('use with simple strings', () => {
  const schema = { hello: 'Hello' }
  const translations = { hello: 'Привет' }

  it('returns translations', ({ expect }) => {
    const options = {
      data: translations,
      locale: 'ru',
    }
    const t = useTranslations(schema, options)

    expect(t).toStrictEqual(translations)
  })

  it('fallbacks to schema', ({ expect }) => {
    const options = {
      data: undefined,
      locale: 'en',
    }
    const t = useTranslations(schema, options)

    expect(t).toStrictEqual(schema)
  })
})

describe('use with transformers', () => {
  const transformFunction = vi.fn<[locale: string, translation?: string], () => string>()
  const schema = { transform: transformFunction }

  beforeEach(() => {
    transformFunction.mockImplementation(
      (locale: string, translation: string = 'mocked') =>
        () => `Hey. ${translation}. ${locale}`,
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('uses transformer with translations', ({ expect }) => {
    const options = {
      data: { transform: 'заглушка' },
      locale: 'ru',
    }
    const t = useTranslations(schema, options)

    expect(t).toHaveProperty('transform')
    expect(t.transform()).toBe('Hey. заглушка. ru')

    expect(transformFunction).toBeCalled()
    expect(transformFunction).toBeCalledWith('ru', 'заглушка')
  })

  it('uses transformer when fallback', ({ expect }) => {
    const options = {
      data: undefined,
      locale: 'en',
    }
    const t = useTranslations(schema, options)

    expect(t).toHaveProperty('transform')
    expect(t.transform()).toBe('Hey. mocked. en')

    expect(transformFunction).toBeCalled()
    expect(transformFunction).toBeCalledWith('en', undefined)
  })
})
