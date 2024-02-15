const _languages = {
    system: 'System',
    en: 'EN',
    th: 'TH',
} as const;
export type Language = keyof typeof _languages;
export type LanguageUI = typeof _languages[Language];