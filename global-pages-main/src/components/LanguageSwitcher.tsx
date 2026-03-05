/**
 * LanguageSwitcher Component
 * 
 * A dropdown that displays all supported languages.
 * Clicking a language instantly switches the UI language,
 * persists the choice, and applies RTL if needed.
 */

import { useState, useRef, useEffect } from "react";
import { languages } from "@/i18n/config";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Current language metadata
  const current = languages.find((l) => l.code === language) ?? languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-accent"
        aria-label={t("language.select")}
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute end-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-lg border border-border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
                lang.code === language
                  ? "bg-accent font-semibold text-accent-foreground"
                  : "text-popover-foreground"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              <span className="ms-auto text-xs text-muted-foreground uppercase">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
