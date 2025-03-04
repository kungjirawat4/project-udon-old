import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import type { LocalePrefix } from 'next-intl/routing';

const localePrefix: LocalePrefix = 'as-needed';
export const routing = ({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localePrefix,
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(
  routing,
);
