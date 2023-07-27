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
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')],
    // prependData: `@import "./_variables.scss";
    //             @import "./_mixin.scss";
    //             `
  },
  assetPrefix: '',
  images: {
    domains: ['https://ddragon.leagueoflegends.com'],
    path: 'https://ddragon.leagueoflegends.com',
    formats: ['image/webp'],
    minimumCacheTTL: 31536000
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
