<!-- <h1 align="center">Astro NanoIntl</h1> -->

<!-- ![Artboard – 21](https://github.com/e3stpavel/astro-nanointl/assets/70956582/a56c5902-66a9-46ff-9ccb-8ae5768dda1d) -->
![Mask Group 9](https://github.com/e3stpavel/astro-nanointl/assets/70956582/db8a0db9-7859-4cce-b38c-efcd97a03a52)

Small, yet powerful set of tools to integrate _internationalization/i18n/intl_ to your [Astro](https://astro.build) project. Strategy-agnostic (__supports both SSG and SSR__) and inspired by [`nanostores/i18n`](https://github.com/nanostores/i18n) and Next.js.

## Prerequisites
Please __do not use this tools for client side__ internationalization as they are __not intended to use on the client and may load bunch of unnecessary JavaScript__. If you want to implement i18n on the client please take a look at [`nanostores/i18n`](https://github.com/nanostores/i18n) or pass translations [as props](https://docs.astro.build/en/core-concepts/framework-components/#passing-props-to-framework-components).

## Install
Use your favorite package manager to install `astro-nanointl` from npm. Below the `pnpm` example:
```
pnpm add -D astro-nanointl
```

Or you can go ahead and give `astro add` a try:
```
pnpm astro add astro-nanointl
```

## Plug
Next, you should just add the integration into your `astro.config`:
```diff
import { defineConfig } from 'astro/config';

+import nanointl from "astro-nanointl";

export default defineConfig({
  integrations: [
+   nanointl({
+     locales: ["en", "ru"]
+   })
  ]
});
```

### TypeScript users
If you're using TypeScript consider adding types to your `env.d.ts`:
```diff
/// <reference types="astro/client" />
+/// <reference types="astro-nanointl/client" />
```

### TypeScript Wizards
If you want to be __stricter with types__ you can go ahead and override `UserDefinedIntl` interface with your types in `env.d.ts` like so:
```typescript
/// <reference types="astro/client" />
/// <reference types="astro-nanointl/client" />

declare module 'virtual:nanointl' {
  interface UserDefinedIntl {
    // here is your locales types
    locales: ['en', 'ru']
  }
}
```

The result will be the following:
```typescript
const { locales } = useLocales()
//      ^? const locales: ["en", "ru"]
```

### Declare your translations
Add your translations to whatever directory you want in project, __but keep in mind__ that integration will scan for every JSON file that ends with locale specified in integration's `locales` property and is in `locales` or `translations` directory except `public` directory. The glob pattern is the following:
```typescript
import.meta.glob([
  '/**/{locales,translations}/**/*.json',
  '!/public/**/{locales,translations}/**/*.json',
], { eager: true, import: 'default' })
```

Translation files should be plain `JSON` files __without deeply nested objects__. Overall the structure is the following:
```json
// locales/ru.json
//  or src/locales/ru.json
//  or locales/greetings/ru.json
//  or src/locales/greetings/ru.json
// all of the above are valid paths
//  but not:
//  public/locales/ru.json
{
  "greetings": { // 'greetings' is componentName
    "hello": "Привет" // this is a transaltion object
  }
}
```

## Play
Start playing around by using `useLocale` composable to get the `t` object containing translated values and `useLocales` composable which returns default locale and the list of all availbale locales declared by you earlier.

### SSR
See the simpliest example:
```typescript
---
// src/pages/[lang]/index.astro -> using `output: 'server'`
import { useLocale } from 'astro-nanointl/utils'

// basically getting locale from url when SSR
const { lang } = Astro.params
const { locale, t } = useLocale(lang, 'greetings', {
  hello: 'Hello everyone!'
})
---

<h1>{ t.hello }</h1>
<p>Locale used: { locale }</p>
```

To avoid errors we can also add check for `undefined` and throw [`404`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) (Not Found) or [`406`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406) (Not Acceptable) if locale or translation was not presented.
```typescript
if (!locale || !t) {
  return new Response(null, {
    status: 404, 
    statusText: 'Not Found'
  })
  // or
  return Astro.redirect('/404')
}
```

### SSG
Let's create example for SSG:
```typescript
---
// src/pages/[locale]/index.astro -> using `output: 'static'` or `output: 'hybrid'`
import type { GetStaticPaths, InferGetStaticParamsType } from 'astro'
import { useLocales, useLocale } from 'astro-nanointl/utils'

export const getStaticPaths = (() => {
  const { locales } = useLocales()

  return locales.map((locale) => ({
    params: { locale }
  }))
}) satisfies GetStaticPaths

type Params = InferGetStaticParamsType<typeof getStaticPaths>

const { locale } = Astro.params as Params
const { t } = useLocale(locale, 'greetings', {
  hello: 'Hello from static page!'
})
---

<h1>{ t.hello }</h1>
<p>Locale used: { locale }</p>
```

### Middleware
You can also consider using middleware to extract the locale from url automagically and persist it to `Astro.locals` global:
```typescript
// src/middleware.ts
import { sequence } from 'astro/middleware'
import { extractLocale } from 'astro-nanointl/middleware'

export const onRequest = sequence(extractLocale)
```

Then you'll be able to use `Astro.locals` to retrieve the locale.
```typescript
// src/pages/[locale]/index.astro -> using `output: 'server'`
import { useLocale } from 'astro-nanointl/utils'

// with middleware added
const { locale } = Astro.locals
const { t } = useLocale(locale, 'greetings', {
  hello: 'Hello everyone!'
})
---

<h1>{ t.hello }</h1>
<p>Locale used: { locale }</p>
```

__Keep in mind!__ You still need to check if `Astro.locals.locale` was defined using `if` statement and `return` appropriate `Response`.

### Default locale
You might also seen that mostly we use `https://example.com` for some sort of default locale and `https://example.com/fr` for language other than our default one. This behaviour can be easily implemented. See the example.

Firstly, you can specify the default locale (_by default_ the first one in `locales` array will be considered as `defaultLocale`):
```typescript
// astro.config.ts
integrations: [
  nanointl({
    locales: ["en", "ru"],
    // by default "en" is considered as `defaultLocale`
    //  but we can override it
    defaultLocale: "ru",
    //  now "ru" is default one
  })
]
```

Then, __while in SSG__ you can get the `defaultLocale` and check if current locale is the same as default one and set the `undefined` for param accordingly. __NB!__ Make sure you use [rest parameter](https://docs.astro.build/en/core-concepts/routing/#rest-parameters) for `locale`.
```typescript
// src/pages/[...locale]/index.astro -> using `output: 'static'` or `output: 'hybrid'`
import type { GetStaticPaths } from 'astro'
import { useLocales } from 'astro-nanointl/utils'

export const getStaticPaths = (() => {
  const { locales, defaultLocale } = useLocales()

  return locales.map((locale) => ({
    params: {
      locale: locale === defaultLocale ? undefined : locale
    }
  }))
}) satisfies GetStaticPaths
```

All other steps are completely the same because you can safely pass `undefined` as a locale for `useLocale` composable (see [API. `useLocale`](#uselocale) below). As a result it will return you the actual value of a `defaultLocale` back.

__While in SSR__, you don't have to change anything except adding [rest parameter](https://docs.astro.build/en/core-concepts/routing/#rest-parameters) for `locale`. All other steps will be exactly the same as already mentioned.

### Slugs
__Keep in mind!__ You can also use `useLocale` composable in `getStaticPaths` function which will let you add translated slugs to generated routes __in SSG__. __For SSR__, you can use regular `if` statement to check if slug matches the translation and then decide what to `return`: the actual page or 404 page.

### Parameterization, pluralization and more
Out of the box you can use following transformers:
* `params` - lets you add parameters to your translation, like so: 
```typescript
greet: params<{ name: string }>('Hello {name}!')
// then use
t.greet({ name: 'John' }) // prints `Hello, John!`
```
* `count` - lets you quickly introduce pluralization, like this:
```typescript
stars: count({
  one: 'a star',
  many: '{count} stars'
})
// then use
t.stars(1) // prints `a star`
t.stars(2) // prints `2 stars`
```
* `args` - lets you specify arguments for translation, like:
```typescript
candies: args<[string, string]>('The first candy name is %1, while second one is %2')
// then use
t.candies('Snickers', 'Bounty') // prints `The first candy name is Snickers, while second one is Bounty`
```

__Keep in mind!__ The translation in files should represent the input transformer string, meaning:
```typescript
// with this base translation
{
  greet: params<{ name: string }>('Hello {name}!'),
  stars: count({
    one: 'a star',
    many: '{count} stars'
  }),
  candies: args<[string, string]>('The first candy name is %1, while second one is %2')
}
```
```json
// ru.json
// json translation should look like this
{
  "componentName": {
    "greet": "Привет, {name}!",
    "stars": {
      "one": "звезда",
      "few": "{count} звезды",
      "many": "{count} звёзд"
    },
    "candies": "Название первой конфеты - %1, в то время как вторая называется %2"
  }
}
```

For more advanced use cases you can [create your own transformer using `@nanostores/i18n` docs](https://github.com/nanostores/i18n#custom-variable-translations) and by importing `transform` and `strings` helper functions from `astro-nanointl/utils`.

### Ideas
- [ ] You can use [Content Collections](https://docs.astro.build/en/guides/content-collections/) and [this example](https://docs.astro.build/en/guides/content-collections/#organizing-with-subdirectories) to add localized content to your pages.
- [ ] You can add custom middleware to add the [`Content-Language` response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language). This will allow
  > to specify the __page's intended audience__ and can indicate that this is more than one language. _(MDN)_
  
  So the implementation will look something like that (considering that we are using [`extractLocale` middleware](#middleware)):
  ```typescript
  export const onRequest = defineMiddleware(async ({ locals }, next) => {
    const response = await next()
    response.headers.append('Content-Language', locals.locale)

    return response
  })
  ```
- [ ] Use translated slugs that will boost your SEO. You can use them in both SSG and SSR. It is simple as calling `useLocale`. Read [this](#slugs).
- [ ] Add [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) to you `html` element in layout. This can be accomplished by either using [`extractLocale` middleware](#middleware) or passing `locale` as [a prop to layout](https://docs.astro.build/en/core-concepts/astro-components/#component-props).
- [ ] Pass all available translation using `l` function to your client-side (UI Frameworks) components as prop and dynamically change them on the fly. This can be especially useful in `output: 'static'` mode when you need to localize some static page on the client like 404 page.
  ```typescript
  const { l } = useLocales()
  const translations = l('greetings', { hello: 'Hello' })

  console.log(translations.en.hello) // `Hello`
  console.log(translations.ru.hello) // `Привет`
  ```
- [ ] Keep the track of current locale and change it on the client using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). The following script will let you to quickly persist the locale on the client and use it here and thereafter. _Advice!_ You can also use [`nanostores/persistent`](https://github.com/nanostores/persistent) to add some layer on the top of vanilla `localStorage`. _More advice!_ By adding this script to some layout will help you to update your locale on the client in every page that uses the layout.
  ```typescript
  <script>
    const locale = document.documentElement.lang
    
    // vanilla version
    window.localStorage.setItem('locale', locale)
    // or nanostores
    import { $locale } from '~/stores/locale'
    $locale.set(locale)
  </script>
  ```
- [ ] Don't forget to add [`hreflang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes) to your `<a>` links.
- [ ] Even thought it is not recommended (worse UX) but you can have different pages for different locales. It is quite simple because you can use conditional syntax to make Astro page templates differ from each other. See the example:
  ```typescript
  {
    locale === 'ru'
      ? <p>Some different layout { t.here }</p>
      : <h1>Totally diferrent layout { t.here }</h1>
  }
  ```
- [ ] Use `f` object and its functions to format time, dates, numbers, currencies and more. It's built on the top of [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) and provides easy to use API:
  ```typescript
  const { f } = useLocale('en', ...)

  console.log(f.time(-2, 'days')) // prints `2 days ago`
  ```
- [ ] Have some troubles? Don't hesitate to [add the issue](https://github.com/e3stpavel/astro-nanointl/issues/new) and ask about :wink:

## API
Params status table:
| Emoji | Status |
| --- | --- |
| :wave: | Required
| :ok_hand: | Optional

### `nanoIntlIntegration`
Adds the `virtual:nanointl` module containing user defined props.

Package: `astro-nanointl`

Params:
* :wave: `locales` - array of available locales, the order matters
* :ok_hand: `defaultLocale` - locale from the `locales` array, which should be considered the default
  * _default_ - first element of `locales` array

Returns:
* `AstroIntegration`

### `useLocales`
Returns the list of all available locales and `defaultLocale`.

Package: `astro-nanointl/utils`

Params: none

Returns:
* :wave: `locales` - non empty array of all available locales, __the order can be not the same as in integration setup__
* :wave: `defaultLocale` - default locale
* :wave: `l` - `l` function, that returns the list of all translations in format `{ '[locale]': { key: 'translation' } }`

### `useLocale`
Return the locale and `t` function which is used for translation.

Package: `astro-nanointl/utils`

Params:
* :wave: `locale` - locale to be used for translation
  * if `undefined`, then treated as `defaultLocale`
* :wave: `componentName` - name of translations workspace
  * According to the following style:
  ```json
  {
    "componentName": {
      "key": "value"
    }
  }
  ```
  Represents the `componentName`.
* :wave: `baseTranslation` - the transaltion schema and translation object for `defaultLocale`
  * According to the following style:
  ```json
  {
    "componentName": {
      "key": "value"
    }
  }
  ```
  Represents the object `{ "key": "value" }`.
  * In code must be declared in locale that is specified as default, i.e. if `defaultLocale` is `"ru"` then
  ```typescript
  useLocale(undefined, 'componentName', {
    "key": "Значение"
  })
  ```
  must be used.
  * Must not be deeply nested object.
  * Supports [`nanostores/i18n`](https://github.com/nanostores/i18n) transformers to implement [pluralization](https://github.com/nanostores/i18n#pluralization), [parameters](https://github.com/nanostores/i18n#parameters) and [more](https://github.com/nanostores/i18n#custom-variable-translations).

Returns:
* :ok_hand: `locale` - defined locale or `undefined` in case if locale does not exist in `locales` array.
* :ok_hand: `t` - object containing translated values for specified locale or `undefined` in case if translation does not exist. If `undefined` make sure you added `[expected_language].json` file to your `locales` directory.
* :ok_hand: `f` - object containing function for formatting time, dates, numbers, currencies and more. Uses [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API under the hood.

### `extractLocale` middleware
Extracts the current locale from [`Astro.params`](https://docs.astro.build/en/reference/api-reference/#astroparams) __using `locale` or `lang` properties__. Otherwise sets `undefined` to [`Astro.locals`](https://docs.astro.build/en/reference/api-reference/#astrolocals) `locale` property.

Package: `astro-nanointl/middleware`

Params:
* [`context`](https://docs.astro.build/en/guides/middleware/#context)
* [`next()`](https://docs.astro.build/en/guides/middleware/#next)

Returns:
* `Response`: either directly, or by calling `next()`.

See the [usage above](#middleware).

---

<p align="right">
  <a href="https://github.com/e3stpavel/astro-nanointl/blob/main/LICENSE">MIT License</a> © 2023 e3stpavel
</p>
