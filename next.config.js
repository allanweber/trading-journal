const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trading/dashboard',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
