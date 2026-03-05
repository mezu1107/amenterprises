/**
 * i18n Configuration
 * 
 * Defines all supported languages and their metadata.
 * To add a new language: add an entry here and create a matching JSON file in /locales.
 */

export interface Language {
  code: string;
  label: string;
  flag: string;
  /** Whether this language uses right-to-left text direction */
  rtl?: boolean;
}

/** All supported languages */
export const languages: Language[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "Arabic", flag: "🇸🇦", rtl: true },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
];

/** Default language code */
export const defaultLanguage = "en";

/** localStorage key for persisting the selected language */
export const STORAGE_KEY = "lang";
