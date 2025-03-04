'use client';

// import NextAuthProvider from './next-auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useState } from 'react';

import { dir } from '@/libs/dir';
import { DEFAULT_QUERY_RETRY } from '@/utils/AppConfig';

import { NextUIProviders } from './nextui-provider';
import { TailwindIndicator } from './tailwind-indicator';

// We can add "user" props to get it from server on first load and pass it to AuthProvider

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
};

export function Providers({ children, locale }: ProvidersProps) {
  const direction = dir(locale);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
            retry: DEFAULT_QUERY_RETRY,
          },
        },
      }),
  );
  return (
    <>
      <NextUIProviders
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>

            {children}

          </ReactQueryStreamedHydration>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools
              buttonPosition={direction === 'rtl' ? 'bottom-left' : 'bottom-right'}
              initialIsOpen={false}
            />
          )}
        </QueryClientProvider>
      </NextUIProviders>
      <TailwindIndicator />
    </>
  );
}
