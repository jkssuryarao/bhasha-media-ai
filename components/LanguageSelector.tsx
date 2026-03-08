'use client';

import { SUPPORTED_LANGUAGES } from '@/lib/constants';

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  disabled?: boolean;
}

export default function LanguageSelector({
  value,
  onChange,
  disabled = false,
}: LanguageSelectorProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="language"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Language
      </label>
      <select
        id="language"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-soft transition-colors focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-saffron"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
