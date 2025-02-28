const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: true, // Enable strict mode for better error handling
  experimental: {
    esmExternals: true,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
