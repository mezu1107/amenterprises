/**
 * Direction Utility
 * 
 * Manages document text direction (LTR/RTL) based on the active language.
 * Arabic uses RTL; all other supported languages use LTR.
 */

import { languages } from "@/i18n/config";

/**
 * Returns "rtl" if the given language code is marked as RTL, otherwise "ltr".
 */
export function getDirection(langCode: string): "ltr" | "rtl" {
  const lang = languages.find((l) => l.code === langCode);
  return lang?.rtl ? "rtl" : "ltr";
}

/**
 * Applies the correct dir attribute and lang attribute to the <html> element.
 * Called whenever the language changes.
 */
export function applyDirection(langCode: string): void {
  const dir = getDirection(langCode);
  document.documentElement.dir = dir;
  document.documentElement.lang = langCode;
}
