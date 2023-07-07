// By importing resources in runtime
//  we avoid using pure Node to load them
export const resources = import.meta.glob([
  '/**/{locales,translations}/**/*.{y(a)?ml,json}',
  '!/public/**/{locales,translations}/**/*.{y(a)?ml,json}',
], { eager: true, import: 'default' })
