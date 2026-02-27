//@ts-check

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  transpilePackages: [
    '@erasys-monorepo/shared-profiles',
    '@erasys-monorepo/shared-ui',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hunqz.com',
        pathname: '/img/usr/original/0x0/**',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
