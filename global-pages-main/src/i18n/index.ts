/**
 * i18n Loader
 * 
 * Dynamically imports translation JSON files based on language code.
 * Uses Vite's glob import for efficient bundling.
 */

// Eagerly import all locale files using Vite's glob import
const localeModules = import.meta.glob("../locales/*.json", { eager: true }) as Record<string, { default: Record<string, unknown> }>;

/** Cache of loaded translations keyed by language code */
const translationsCache: Record<string, Record<string, unknown>> = {};

// Pre-populate cache from glob imports
for (const path in localeModules) {
  // Extract language code from path: "../locales/en.json" -> "en"
  const match = path.match(/\/(\w+)\.json$/);
  if (match) {
    translationsCache[match[1]] = localeModules[path].default ?? (localeModules[path] as unknown as Record<string, unknown>);
  }
}

/**
 * Retrieves translations for a given language code.
 * Returns cached translations or empty object if language not found.
 */
export function getTranslations(lang: string): Record<string, unknown> {
  return translationsCache[lang] ?? {};
}

/**
 * Resolves a dot-notation key (e.g. "hero.title") against a translations object.
 * Returns the key itself if not found (useful for debugging missing translations).
 */
export function resolveKey(translations: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = translations;

  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key; // Key not found — return key as fallback
    }
  }

  return typeof current === "string" ? current : key;
}
