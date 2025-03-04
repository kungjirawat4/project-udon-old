import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

// * how many times the api will retry by default with react-query
export const DEFAULT_QUERY_RETRY = 3;

export const LOGIN_DEFAULT_REDIRECT = '/medicine';
export const DEFAULT_REMEMBER_ME = 7;

// * Setting "NextLink" prefetch default value
export const DEFAULT_PREFETCH = false;

export const publicRoutes = ['/', '/auth/new-verification'];

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/reset-password',
  '/auth/new-password',
];

// export const apiAuthPrefix = ['api/auth'];

export const siteConfig = {
  name: 'Next.js + NextUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'หน้าหลัก',
      href: '/medicine',
      image: 'http://localhost:3000/images/house.png',
    },
    {
      label: 'ใบสั่งยา',
      href: '/medicine/prescription',
      image: 'http://localhost:3000/images/prescription.png',
    },
    {
      label: 'การคัดกรอง',
      href: '/medicine/screening',
      image: 'http://localhost:3000/images/screening01.png',
    },
    {
      label: 'จับคู่ตะกร้า',
      href: '/medicine/matching',
      image: 'http://localhost:3000/images/autoload.png',
    },
    {
      label: 'สถานียา',
      href: '/medicine/station',
      image: 'http://localhost:3000/images/cabinet.png',
    },
    {
      label: 'การตรวจสอบ',
      href: '/medicine/check',
      image: 'http://localhost:3000/images/drug_check.png',
    },
    {
      label: 'การรับคิว',
      href: '/medicine/queue',
      image: 'http://localhost:3000/images/call_q.png',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
      image: 'images/screening.png',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      image: 'images/screening.png',
    },
    {
      label: 'Projects',
      href: '/projects',
      image: 'images/screening.png',
    },
    {
      label: 'Team',
      href: '/team',
      image: 'images/screening.png',
    },
    {
      label: 'Calendar',
      href: '/calendar',
      image: 'images/screening.png',
    },
    {
      label: 'Settings',
      href: '/settings',
      image: 'images/screening.png',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
      image: 'images/screening.png',
    },
    {
      label: 'Logout',
      href: '/logout',
      image: 'images/screening.png',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
