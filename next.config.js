const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true, // Enable strict mode for better error handling
  experimental: {
    esmExternals: true,
    // jsconfigPaths is no longer needed in Next.js 15
  },
  // Fix hydration issues by disabling SSR for pages with localStorage/authentication
  // This helps with components that need to access localStorage
  compiler: {
    styledComponents: true, // Enables styled-components compatibility
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}

module.exports = nextConfig
