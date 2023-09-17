import type { MiddlewareResponseHandler } from 'astro'
import { defineMiddleware } from 'astro/middleware'
import { useLocale } from '../locale'

/**
 * Extracts the locale from `Astro.params`, either the `locale` or `lang` attribute
 */
export const onRequest = defineMiddleware(({ locals, params }, next) => {
  // let header: string | undefined
  const param = params.locale ?? params.lang

  // TODO: it might be unnecessary
  // if (request.headers.has('Accept-Language')) {
  //   header = request.headers.get('Accept-Language')
  //     ?.split(/(,|;q=(?:\d\.\d+),?)/)
  //     .filter(locale => locale !== '*')
  //     .at(0)
  // }

  const { locale } = useLocale(param, '', {})
  locals.locale = locale

  return next()
}) satisfies MiddlewareResponseHandler
