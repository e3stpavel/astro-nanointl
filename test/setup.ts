import { afterEach, vi } from 'vitest'

vi.mock('virtual:nanointl', () => ({
  locales: new Set(['en', 'ru']),
  defaultLocale: 'en',
}))

vi.mock('../src/misc/resources', () => ({
  resources: {
    './locales/some-path/ru.json': { componentName: { message: 'Сообщение' } },
    './locales/some-other-path/ru.json': {
      transformers: {
        parameters: 'Привет от {name}',
        pluralization: {
          one: 'просто робот',
          few: '{count} робота',
          many: '{count} роботов',
        },
      },
    },
  },
}))

afterEach(() => {
  vi.resetAllMocks()
})
