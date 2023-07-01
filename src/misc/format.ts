import type { Locale } from 'virtual:nanointl'

export function format(locale: Locale) {
  return {
    date: (date: Date, options?: Intl.DateTimeFormatOptions) => {
      return new Intl.DateTimeFormat(locale, options).format(date)
    },
    number: (number: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(locale, options).format(number)
    },
    list: <T extends string>(list: Array<T>, options?: Intl.ListFormatOptions) => {
      return new Intl.ListFormat(locale, options).format(list)
    },
    time: (value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions) => {
      return new Intl.RelativeTimeFormat(locale, options).format(value, unit)
    },
    name: (type: Intl.DisplayNamesType, code: string, options?: Intl.DisplayNamesOptions) => {
      return new Intl.DisplayNames(locale, { ...options, type }).of(code)
    },
  }
}
