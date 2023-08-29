const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = withNextIntl({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trading/dashboard',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/trading/dashboard',
        permanent: true,
      },
      {
        source: '/pt',
        destination: '/pt/trading/dashboard',
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
