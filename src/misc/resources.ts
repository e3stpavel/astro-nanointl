// By importing resources in runtime
//  we avoid using pure Node to load them
export const resources = import.meta.glob([
  '/**/{locales,translations}/**/*.json',
  '!/public/**/{locales,translations}/**/*.json',
], { eager: true, import: 'default' })
