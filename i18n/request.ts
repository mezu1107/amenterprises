import { getRequestConfig } from "next-intl/server"

export const locales = [
  "en",
  "ar",
  "de",
  "fr",
  "tr",
  "zh",
  "ja"
] as const

export const defaultLocale = "en"

export default getRequestConfig(async ({ locale }) => {

  // Ensure locale is always a valid string
  const currentLocale =
    typeof locale === "string" && locales.includes(locale as any)
      ? locale
      : defaultLocale

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  }
})