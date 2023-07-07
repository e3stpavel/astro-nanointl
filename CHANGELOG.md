# astro-nanointl

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
