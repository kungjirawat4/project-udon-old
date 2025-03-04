'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

import { ThemeProvider } from './theme-provider';

export function NextUIProviders({ children, ...props }: ThemeProviderProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </NextUIProvider>
  );
}
