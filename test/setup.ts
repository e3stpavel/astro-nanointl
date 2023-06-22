import { afterEach, vi } from 'vitest'

vi.mock('virtual:nanointl', () => ({
  locales: new Set(['en', 'ru']),
  defaultLocale: 'en',
  resources: {
    './locales/some-path/ru.json': { componentName: { message: 'Сообщение' } },
  },
}))

afterEach(() => {
  vi.resetAllMocks()
})
