import type { AstroIntegration } from 'astro'
import type { Locales } from 'virtual:nanointl'
import virtual from 'vite-plugin-virtual'

// type Shape = Readonly<[string, ...string[]]>
type Shape = Locales
interface UserOptions<T extends Shape> {
  locales: T
  defaultLocale?: T[number]
}

export function nanoIntlIntegration<const T extends Shape>({ locales, defaultLocale = locales.at(0)! }: UserOptions<T>): AstroIntegration {
  return {
    name: 'astro-nanointl',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              virtual({
                'virtual:nanointl': `
                  export const locales = new Set(${JSON.stringify(locales)})
                  export const defaultLocale = ${JSON.stringify(defaultLocale)}
                `,
              }),
            ],
          },
        })
      },
    },
  }
}

export default nanoIntlIntegration
