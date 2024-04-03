// TODO: convert to transformer(s) later?
export function format(locale: string) {
  return {
    /**
     * Enables language-sensitive date and time formatting.
     *
     * @param date - The date to format
     * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/DateTimeFormat#parameters) with some or all options of `DateTimeFormatOptions`
     * @returns Formatted date according to the locale and formatting options
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format)
     */
    date: (date: Date, options?: Intl.DateTimeFormatOptions) => {
      return new Intl.DateTimeFormat(locale, options).format(date)
    },

    /**
     * Enables language-sensitive number formatting.
     *
     * @param number - Numeric value to use
     * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters) with some or all options of `NumberFormatOptions`
     * @returns Formatted number according to the locale and formatting options
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format)
     */
    number: (number: number | bigint, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(locale, options).format(number)
    },

    /**
     * Returns a string with a language-specific representation of the list.
     *
     * @param list - An iterable object, such as an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
     * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat#parameters) with some or all options of `ListFormatOptions`
     * @returns A language-specific formatted string representing the elements of the list
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format).
     */
    list: <T extends string>(list: Array<T>, options?: Intl.ListFormatOptions) => {
      return new Intl.ListFormat(locale, options).format(list)
    },

    /**
     * Formats a value and a unit according to the locale and formatting options.
     *
     * While this method automatically provides the correct plural forms,
     * the grammatical form is otherwise as neutral as possible.
     *
     * @param value - Numeric value to use in the internationalized relative time message
     * @param unit - [Unit](https://tc39.es/ecma402/#sec-singularrelativetimeunit) to use in the relative time internationalized message
     * @param options - An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters) with some or all of options of `RelativeTimeFormatOptions`
     * @returns Internationalized relative time message as string
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format)
     */
    time: (value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions) => {
      return new Intl.RelativeTimeFormat(locale, options).format(value, unit)
    },

    /**
     * Receives a code and returns a string based on the locale and options provided.
     *
     * @param type The type of `code`
     * @param code The `code` to provide depends on the `type`:
     *  - If the type is `"region"`, code should be either an [ISO-3166 two letters region code](https://www.iso.org/iso-3166-country-codes.html),
     *    or a [three digits UN M49 Geographic Regions](https://unstats.un.org/unsd/methodology/m49/).
     *  - If the type is `"script"`, code should be an [ISO-15924 four letters script code](https://unicode.org/iso15924/iso15924-codes.html).
     *  - If the type is `"language"`, code should be a `languageCode` ["-" `scriptCode`] ["-" `regionCode` ] *("-" `variant` )
     *    subsequence of the unicode_language_id grammar in [UTS 35's Unicode Language and Locale Identifiers grammar](https://unicode.org/reports/tr35/#Unicode_language_identifier).
     *    `languageCode` is either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code.
     *  - If the type is `"currency"`, code should be a [3-letter ISO 4217 currency code](https://www.iso.org/iso-4217-currency-codes.html).
     * @param options An object for setting up a display name
     * @returns string based on the locale and options provided
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/of).
     */
    name: (type: Intl.DisplayNamesType, code: string, options?: Intl.DisplayNamesOptions) => {
      return new Intl.DisplayNames(locale, { ...options, type }).of(code)
    },
  }
}
