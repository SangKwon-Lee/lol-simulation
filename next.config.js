/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  assetPrefix: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        port: '',
        pathname: '/**'
      }
    ],
    imageSizes: [16, 64],
    deviceSizes: [640, 1080]
  },
  compiler: {
    styledComponents: true,
    ssr: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\\.svg$/,
      issuer: /\\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    // scss import alias
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@assets': path.resolve(__dirname, 'static/assets')
    // };
    return config;
  }
};

module.exports = withNextIntl(nextConfig);
