// import '@/styles/global.css';

// // import 'react-toastify/dist/ReactToastify.min.css';
// import { cn } from '@nextui-org/theme';
// import { SessionProvider } from 'next-auth/react';
// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
// import type { ReactNode } from 'react';
// import { ToastContainer } from 'react-toastify';

// import { fontHeading, fontSatoshi } from '@/assets/fonts';
// import auth from '@/auth';
// import { Providers } from '@/components/providers';
// import { dir } from '@/libs/dir';
// import { AppConfig } from '@/utils/AppConfig';

// type Props = {
//   children: ReactNode;
//   params: { locale: string };
// };

// export function generateStaticParams() {
//   return AppConfig.locales.map(locale => ({ locale }));
// }

// export async function generateMetadata({
//   params: { locale },
// }: Omit<Props, 'children'>) {
//   const t = await getTranslations({ locale, namespace: 'RootLayout' });

//   return {
//     title: {
//       default: t('title'),
//       template: `%s | ${t('title')}`,
//     },
//     // description: t('default'),

//     icons: [
//       {
//         rel: 'apple-touch-icon',
//         url: '/apple-touch-icon.png',
//       },
//       {
//         rel: 'icon',
//         type: 'image/png',
//         sizes: '32x32',
//         url: '/favicon-32x32.png',
//       },
//       {
//         rel: 'icon',
//         type: 'image/png',
//         sizes: '16x16',
//         url: '/favicon-16x16.png',
//       },
//       {
//         rel: 'icon',
//         url: '/favicon.ico',
//       },
//     ],

//     robots: {
//       follow: process.env.NEXT_PUBLIC_ENV === 'production',
//       index: process.env.NEXT_PUBLIC_ENV === 'production',
//     },
//   };
// }

// export default async function RootLocaleLayout(props: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   unstable_setRequestLocale(props.params.locale);

//   // Using internationalization in Client Components
//   const messages = await getMessages();
//   const session = await auth();

//   return (
//     <html lang={props.params.locale} suppressHydrationWarning dir={dir(props.params.locale)}>
//       <body
//         className={
//           (cn(props.params.locale === 'ar' ? 'font-cairo' : 'font-inter'),
//           fontHeading.variable,
//           fontSatoshi.variable)
//         }
//       >
//         <NextIntlClientProvider locale={props.params.locale} messages={messages}>
//           <SessionProvider session={session} basePath="/api/auth">
//             <Providers
//               locale={props.params.locale}
//             >
//               {props.children}
//               <ToastContainer
//                 rtl={false}
//                 limit={1}
//                 position={dir(props.params.locale) === 'rtl' ? 'top-left' : 'top-right'}
//               />
//             </Providers>
//             {/* <DemoBadge /> */}
//           </SessionProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { cn } from '@nextui-org/theme';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { THSarabun, THSarabunNew } from '@/assets/fonts';
import auth from '@/auth';
import { Providers } from '@/components/providers';
import { dir } from '@/libs/dir';
import { AppConfig } from '@/utils/AppConfig';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return AppConfig.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'RootLayout' });

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    // description: t('default'),

    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],

    robots: {
      follow: process.env.NEXT_PUBLIC_ENV === 'production',
      index: process.env.NEXT_PUBLIC_ENV === 'production',
    },
  };
}

export default async function RootLocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={props.params.locale} suppressHydrationWarning dir={dir(props.params.locale)} className="h-full">
      <body
        className={
          (cn('overflow-hidden bg-background font-sans antialiased', props.params.locale === 'ar' ? 'font-cairo' : 'font-inter'),
          THSarabunNew.variable,
          THSarabun.variable)
        }
      >
        <NextIntlClientProvider locale={props.params.locale} messages={messages}>
          <SessionProvider session={session} basePath="/api/auth">
            <Providers
              locale={props.params.locale}
            >
              {props.children}
              <ToastContainer
                rtl={false}
                limit={1}
                position={dir(props.params.locale) === 'rtl' ? 'top-left' : 'top-right'}
              />
            </Providers>
            {/* <DemoBadge /> */}
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
