module.exports = {
  // TODO Docs https://vercel.com/guides/how-to-enable-cors#enabling-cors-in-a-next.js-app
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  env: {
    // API_ROUTE: "http://localhost:3000",
  },
  reactStrictMode: true,
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#domains
    // domains: [
    //   'images.unsplash.com',
    //   'indonesia.travel',
    //   'encrypted-tbn0.gstatic.com',
    //   'encrypted-tbn1.gstatic.com',
    //   'encrypted-tbn2.gstatic.com',
    //   'encrypted-tbn3.gstatic.com',
    //   'lh5.googleusercontent.com',
    //   'https://img.youtube.com/vi/',
    // ],
    // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'indonesia.travel',
        port: '',
        pathname: '/content/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn1.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn2.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn3.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
        port: '',
        pathname: '/p/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    unoptimized: true,
  },
};
