/**
 * Language Context
 * 
 * Provides global language state to the entire application via React Context.
 * - Persists selected language in localStorage
 * - Applies RTL/LTR direction on language change
 * - Exposes a `t()` translation function and `setLanguage()` setter
 */

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { defaultLanguage, STORAGE_KEY } from "@/i18n/config";
import { getTranslations, resolveKey } from "@/i18n";
import { applyDirection } from "@/utils/direction";

interface LanguageContextValue {
  /** Current language code (e.g. "en", "ar") */
  language: string;
  /** Change the active language */
  setLanguage: (code: string) => void;
  /** Translate a dot-notation key, e.g. t("hero.title") */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/**
 * Reads the persisted language from localStorage, falling back to default.
 */
function getInitialLanguage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>(getInitialLanguage);

  /** Update language, persist to storage, and apply text direction */
  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    localStorage.setItem(STORAGE_KEY, code);
    applyDirection(code);
  }, []);

  /** Translation function — resolves dot-notation keys */
  const t = useCallback(
    (key: string): string => {
      const translations = getTranslations(language);
      return resolveKey(translations, key);
    },
    [language]
  );

  // Apply direction on initial mount
  useEffect(() => {
    applyDirection(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context. Must be used within <LanguageProvider>.
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
