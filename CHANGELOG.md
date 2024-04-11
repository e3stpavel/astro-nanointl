# astro-nanointl

## 1.0.0

### Major Changes

- 89bbcb7: Added new `useTranslations` function

  There is no backward compatibility because function API is changed. Refer to docs to learn more.

- 3a570d3: Removed some overhead and updated to Astro `v4.0.0`

  There is no backward compatibility because of [new built-in Astro i18n API](https://docs.astro.build/en/guides/internationalization/).

  Deprecated features:

  - Custom integration
  - Literal types for locales
  - Strict translations loading from file system
  - Access to default locale
  - Custom middleware
  - `l` function
  - Integration with [`nanostores`](https://github.com/nanostores/nanostores) and [`@nanostores/i18n`](https://github.com/nanostores/i18n)

### Patch Changes

- fd66630: Updated `args` transformer with `@nanostores/i18n` dependencies removed
- 1a07cb4: Added [Content Collection](https://docs.astro.build/en/guides/content-collections) custom translations schema.
  See [Using third-party collection schemas](https://docs.astro.build/en/guides/content-collections/#using-third-party-collection-schemas) for more.
- ca26e87: Updated `count` transformer with `@nanostores/i18n` dependencies removed
- 1187648: Updated `params` transformer with `@nanostores/i18n` dependencies removed

## 0.0.7

### Patch Changes

- e439b6f: Fixed `unmet peer dependency` for Astro `^v3.0.0`

## 0.0.6

### Patch Changes

- 9bb2395: :bug: Fixed `Could not resolve "virtual:nanointl"` in `extractLocale` middleware

## 0.0.5

### Patch Changes

- 9d594d0: :sparkles: Added aliases for `useLocale` and `useLocales` composables.

  Now you can call `createTranslation` or `useTranslation` instead of `useLocale` as well as call `useTranslations` instead of `useLocales`. This might be useful for you to write more comprehensive and self-documenting code.

- 1979955: :sparkles: Added YAML support.

  Now you can load not only `.json` translation files, but also `.yaml` and `.yml`.

- ab65f5e: :package: Rearranged dependencies

## 0.0.4

### Patch Changes

- b33fb0e: Fixed `(intermediate value).glob is not a function` issue

## 0.0.3

### Patch Changes

- 405bc8a: Fixed types to work with `moduleResolution` not in `Node16` or `NodeNext`.

  Before you needed to [set `moduleResolution` in `compilerOptions` to `Node16` or `NodeNext`](https://stackoverflow.com/a/70020984) in order to types work. Now you don't need to. It should work out of the box!

## 0.0.2

### Patch Changes

- 7a6927b: Re-exported [`@nanostores/i18n`](https://github.com/nanostores/i18n) `transform` and `strings` helper functions to easily create own transformers
