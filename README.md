<!-- <h1 align="center">Astro NanoIntl</h1> -->

<!-- ![Artboard – 21](https://github.com/e3stpavel/astro-nanointl/assets/70956582/a56c5902-66a9-46ff-9ccb-8ae5768dda1d) -->
![Mask Group 9](https://github.com/e3stpavel/astro-nanointl/assets/70956582/6973bca0-7eb1-4bbe-8302-b6bd77cb24b1)

Tiny, yet powerful set of tools to integrate _internationalization (a.k.a i18n, a.k.a intl)_ to your [Astro](https://astro.build) project. Strategy-agnostic (__supports both SSG and SSR__) and inspired by [`nanostores/i18n`](https://github.com/nanostores/i18n).

## Before you use
These tool are not supposed to be used on the client. Even though they __will work__, there might be inconsistencies between the browsers as tools heavily rely on [JavaScript `Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

Therefore, you should be careful when using these tools on the client. Keep in mind that some older browsers might not support each and every feature.

## Install
Opt in by installing `astro-nanointl` into your Astro project. Use your favorite package manager to install it from npm:

```
npm install -D astro-nanointl
```

```
pnpm add -D astro-nanointl
```

## Plug
Next, it is recommended to set up [i18n Routing](https://docs.astro.build/en/guides/internationalization).

__Note!__ The package itself is not doing anything with routing, it is just adds the abstraction layer over your translations to streamline the localization process.

The simplest way to enable [i18n Routing](https://docs.astro.build/en/guides/internationalization) is as follows:

```diff
import { defineConfig } from 'astro/config'

export default defineConfig({
+  i18n: {
+    defaultLocale: 'en',
+    locales: ['en', 'ru']
+  },
})
```

## Play
Now you're ready to give `astro-nanointl` a try! Let's explore what we can do with it, shall we?

### Generate/render pages
We are unopinionated on how you should generate/render pages. You could create pages explicitly (as shown in [Astro docs](https://docs.astro.build/en/guides/internationalization/#configure-i18n-routing)) or use [file-based routing](https://docs.astro.build/en/basics/astro-pages/#file-based-routing) to do the trick.

### Current locale
In order to retrieve the current locale you should use [built-in `currentLocale` property from `Astro` global](https://docs.astro.build/en/reference/api-reference/#astrocurrentlocale).

Simple as that:
```typescript
const locale = Astro.currentLocale
```

### Translations
You might be wondered: where do I store my translations? The answer is __anywhere you like__. Yeah, you can store your translations in file system, utilize [Content Collections](https://docs.astro.build/en/guides/content-collections/) or even fetch them from remote source.

Sounds awesome, right? However, here are few points you should remember:
  * Translations are strings, the only exception is `count` transformer ([see pluralization](#count))
  * You should __not__ include your default language translations as they are already inside your source code
  * The translations must match the schema you declared inside your source code, otherwise they won't be used
  * Alongside with your translations you must provide the locale they are created for, which should be comparable with the [one JavaScript `Intl` can use](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

### Usage with Content Collections
`config.ts` file inside `src/content` directory:

```typescript
import { defineCollection } from "astro:content"
import { translationsSchema } from "astro-nanointl"

export const collections = {
  translations: defineCollection({
    type: 'data',
    schema: translationsSchema
  })
}
```

Folder structure:

```
src/
  content/
    translations/
      ru/
        index.yaml
        some-page.yaml
        some-component.yaml
    config.ts
  pages/...
```

`ru/index.yaml` inside `src/content/translations`:

```
hello: мир

stars:
  one: {count} звезда
  few: {count} звезды
  many: {count} звезд
```

`index.astro` file inside `src/pages` directory:

```astro
---
import { getEntry } from "astro:content"
import { useTranslations } from "astro-nanointl"
import { count } from "astro-nanointl/transformers"

// page render omitted

const locale = Astro.currentLocale!
const translations = await getEntry('translations', `${locale}/index`)

const t = useTranslations({
  hello: 'world',
  stars: count({
    one: '{count} star',
    many: '{count} stars'
  })
}, {
  data: translations?.data
  locale
})
---

<p>{ t.hello }</p>
<p>{ t.stars(10) }</p>
```

### Usage with file system
Folder structure:

```
src/
  locales/
    ru.json
  pages/...
```

`ru.json` inside `src/locales`:

```json
{
  "hello": "мир",
  "stars": {
    "one": "{count} звезда",
    "few": "{count} звезды",
    "many": "{count} звезд"
  }
}
```

> __Note!__ If you would like to use `yaml` or `yml` you might want to [enable YAML in Astro manually](https://docs.astro.build/en/recipes/add-yaml-support/).

`index.astro` file inside `src/pages` directory:

```astro
---
import { useTranslations } from "astro-nanointl"
import { count } from "astro-nanointl/transformers"

// page render omitted

const locale = Astro.currentLocale!
const translations = await import(`../locales/${locale}.json`)

const t = useTranslations({
  hello: 'world',
  stars: count({
    one: '{count} star',
    many: '{count} stars'
  })
}, {
  data: translations.default
  locale
})
---

<p>{ t.hello }</p>
<p>{ t.stars(10) }</p>
```

### Usage with remote source
You could use [`fetch`](https://docs.astro.build/en/guides/data-fetching/#fetch-in-astro) to load your translations from remote source. All the other steps will look the same!

`index.astro` file inside `src/pages` directory:
```astro
---
import { useTranslations } from "astro-nanointl"
import { count } from "astro-nanointl/transformers"

// page render omitted

const locale = Astro.currentLocale!

const response = await fetch(`https://example.com/api/${locale}/index-page`)
const translations = await response.json()

const t = useTranslations({
  hello: 'world',
  stars: count({
    one: '{count} star',
    many: '{count} stars'
  })
}, {
  data: translations
  locale
})
---

<p>{ t.hello }</p>
<p>{ t.stars(10) }</p>
```

## Parameterization, pluralization and more
You can use several transformers that will help you to enhance your developer experience while localizing.

> __Note!__ The transformers are imported from `astro-nanointl/transformers`

### `params`
Particularly useful when you have an object or many different parameters that need to be included in the translation.

```typescript
const t = useTranslations({
  greeting: params('Good {timeOfDay}, {username}!'),
}, translations)

t.greeting({ timeOfDay: 'morning', name: '@eskozloi' }) // prints `Good morning, @eskozloi!`
```

### `count`
Use it when you need to introduce pluralization.

```typescript
const t = useTranslations({
  stars: count({
    one: 'a star',
    many: '{count} stars'
  })
}, translations)

t.count(1) // prints `a star`
t.count(3) // prints `3 stars`
```

> __Tip!__ If you also want to interpolate a number into translation string, add `{count}`

### `args`
Useful when you just need to interpolate some values into translation string. The limit is 9 arguments.

```typescript
const t = useTranslations({
  myNameIs: args('Hey, my name is %1')
}, translations)

t.myNameIs('John') // prints `Hey, my name is John`
```

### `format`
You can use `format` to format dates, numbers etc. It is just an abstraction for JavaScript `Intl` to simplify its use. You can always replace it with default `Intl` implementation if you want.

```typescript
import { format } from 'astro-nanointl'

const yesterday = format(locale).time(-1, 'day') // contains `1 day ago`
```

### Type safety
All the transformers provide type safety but keep in mind that your schema should be a const. This means that if you don't create your schema object when you call `useTranslations` function, you may need to add `as const` to your schema object to preserve transformer types.

```typescript
const schema = {
  hello: 'world',
  stars: count({
    one: 'a star',
    many: '{count} stars'
  })
} as const

const t = useTranslations(schema, ...)
```

---

<p align="right">
  <a href="https://github.com/e3stpavel/astro-nanointl/blob/main/LICENSE">MIT License</a> © 2023 e3stpavel
</p>
