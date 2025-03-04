import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/libs/Env');

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    reactStrictMode: true,
    // async rewrites() {
    //   return [
    //     {
    //       source: '/api/:path*',
    //       destination: 'http://172.16.2.254:8080/udh/:path*',
    //       basePath: false,
    //     },
    //   ];
    // },

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        { protocol: 'http', hostname: '**' },
      ],
    },
  }),
);
