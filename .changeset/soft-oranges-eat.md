---
"astro-nanointl": major
---

Removed some overhead and updated to Astro `v4.0.0`

There is no backward compatibility because of [new built-in Astro i18n API](https://docs.astro.build/en/guides/internationalization/).

Deprecated features:
  * Custom integration
  * Literal types for locales
  * Strict translations loading from file system
  * Access to default locale
  * Custom middleware
  * `l` function
  * Integration with [`nanostores`](https://github.com/nanostores/nanostores) and [`@nanostores/i18n`](https://github.com/nanostores/i18n)
