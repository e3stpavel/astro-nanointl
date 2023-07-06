# astro-nanointl

## 0.0.3

### Patch Changes

- 405bc8a: Fixed types to work with `moduleResolution` not in `Node16` or `NodeNext`.

  Before you needed to [set `moduleResolution` in `compilerOptions` to `Node16` or `NodeNext`](https://stackoverflow.com/a/70020984) in order to types work. Now you don't need to. It should work out of the box!

## 0.0.2

### Patch Changes

- 7a6927b: Re-exported [`@nanostores/i18n`](https://github.com/nanostores/i18n) `transform` and `strings` helper functions to easily create own transformers
