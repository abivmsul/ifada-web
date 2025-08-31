// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Prefer `remotePatterns` for flexibility, but `domains` also works.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ifadaislamic.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // for Sanity-hosted images (important later)
        port: '',
        pathname: '/**',
      },
      // Add other hosts you may use, e.g. 'images.example.com'
    ],
    // domains: ['ifadaislamic.org', 'cdn.sanity.io'], // alternative
  },
}

module.exports = nextConfig
