export interface Helper {
  name: string;
  description: string;
  code: string;
}

export interface HighlightedHelper extends Helper {
  highlightedLight: string;
  highlightedDark: string;
}

export const helpers: Helper[] = [
  {
    name: "currency",
    description:
      "Formats a numeric value as a currency string. Accepts a value, a currency ID, a locale, and an optional maximumFractionDigits.",
    code: `function currency(value, currencyId, locale, maximumFractionDigits) {
  // locale should be mandatory
  if(locale == undefined) return currencySymbol(currencyId) + ' ' + Number.parseFloat(value || 0.00).toFixed(2).replace('.', ',');

  // maximumFractionDigits is no longer supported
  if(maximumFractionDigits != undefined) return currencySymbol(currencyId) + ' ' + Number.parseFloat(value || 0.00).toFixed(maximumFractionDigits).replace('.', ',');

  return value.toLocaleString(locale, { style: 'currency', currency: currencyId });
}`,
  },
  {
    name: "date",
    description:
      "Formats a date value using moment-timezone. Accepts a value, a moment.js format string, a culture/locale code, and an optional timezone (defaults to Europe/Amsterdam).",
    code: `function date(value, format, culture, timezone='Europe/Amsterdam') {
  return require('moment-timezone').tz(value, timezone).locale(culture).format(format);
}`,
  },
  {
    name: "dayOfWeek",
    description:
      "Returns the localized full day name for a given day-of-week number (1 = Monday … 7 = Sunday). Accepts a day number and a locale/language code.",
    code: `function dayOfWeek(nr, language) {
  var moment = require('moment');
  moment.locale(language);
  return moment().day(nr).format('dddd');
}`,
  },
];

export function getHelpers(names: string[]): Helper[] {
  return names.map((name) => {
    const helper = helpers.find((h) => h.name === name);
    if (!helper) throw new Error(`Helper "${name}" not found in registry`);
    return helper;
  });
}
