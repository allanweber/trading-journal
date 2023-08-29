/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
