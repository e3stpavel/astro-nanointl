import type { AstroIntegration } from 'astro'
import type { Locales } from 'virtual:nanointl'
import { FAILSAFE_SCHEMA } from 'js-yaml'
import virtual from 'vite-plugin-virtual'
import yaml from '@modyfi/vite-plugin-yaml'

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
              yaml({
                schema: FAILSAFE_SCHEMA,
              }),
              virtual({
                'virtual:nanointl': `
                  export const locales = new Set(${JSON.stringify(locales)})
                  export const defaultLocale = ${JSON.stringify(defaultLocale)}
                `,
              }),
            ],

            // fixes: Could not resolve "virtual:nanointl"
            optimizeDeps: {
              exclude: ['virtual:nanointl'],
            },
          },
        })
      },
    },
  }
}

export default nanoIntlIntegration
