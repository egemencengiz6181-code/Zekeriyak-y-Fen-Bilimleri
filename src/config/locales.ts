// Plain constants – safe to import from both Server and Client components
// without triggering createSharedPathnamesNavigation in a server context.

export const locales = ['tr'] as const;
export type Locale = (typeof locales)[number];
export const localePrefix = 'always' as const;
