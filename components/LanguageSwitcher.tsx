'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation'; // custom navigation (tumhare i18n/navigation.ts se)
import { useTransition } from 'react';

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const current = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative inline-block text-left">
      {/* Current language button */}
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 hover:bg-gray-700 disabled:opacity-50"
        disabled={isPending}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-xs opacity-70">▼</span>
        {isPending && <span className="ml-1 animate-spin">⌛</span>}
      </button>

      {/* Dropdown list (hover ya click pe show karne ke liye CSS add kar sakte ho) */}
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-md shadow-lg hidden group-hover:block z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center w-full px-4 py-2 text-left text-white hover:bg-gray-700 ${
              lang.code === locale ? 'bg-gray-900' : ''
            }`}
            disabled={isPending || lang.code === locale}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}