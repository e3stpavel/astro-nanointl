import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'index': 'index.ts',
    'utils/index': 'src/index.ts',
    'middleware/index': 'src/middleware/index.ts',
  },
  external: [
    'virtual:nanointl',
  ],
})
