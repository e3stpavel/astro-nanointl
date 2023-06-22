import { afterEach, describe, expect, it, vi } from 'vitest'
import type { APIContext } from 'astro'
import { extractLocale } from '../../src/middleware'

const callback = () => new Promise<Response>(resolve => resolve(new Response()))
let locals = vi.mocked({})

describe('extract locale middleware', () => {
  afterEach(() => {
    locals = {}
  })

  it('should not return locale', () => {
    const mock = vi.fn(extractLocale)
    mock({ locals, params: { locale: 'not-exists' } } as never as APIContext, callback)

    expect(locals).toHaveProperty('locale', undefined)
  })

  it('should return default locale', () => {
    const mock = vi.fn(extractLocale)
    mock({ locals, params: { locale: undefined } } as never as APIContext, callback)

    expect(locals).toHaveProperty('locale', 'en')
  })

  it('should return locale', () => {
    const mock = vi.fn(extractLocale)
    mock({ locals, params: { locale: 'ru' } } as never as APIContext, callback)

    expect(locals).toHaveProperty('locale', 'ru')
  })

  it('should return locale with \'lang\' param', () => {
    const mock = vi.fn(extractLocale)
    mock({ locals, params: { lang: 'ru' } } as never as APIContext, callback)

    expect(locals).toHaveProperty('locale', 'ru')
  })

  it('should return default locale without proper params', () => {
    const mock = vi.fn(extractLocale)
    mock({ locals, params: {} } as never as APIContext, callback)

    expect(locals).toHaveProperty('locale', 'en')
  })
})
