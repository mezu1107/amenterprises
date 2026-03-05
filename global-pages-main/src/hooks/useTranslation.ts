/**
 * useTranslation Hook
 * 
 * Convenience wrapper around the language context.
 * Returns { t, language, setLanguage } for use in any component.
 */

import { useLanguage } from "@/context/LanguageContext";

export function useTranslation() {
  return useLanguage();
}
