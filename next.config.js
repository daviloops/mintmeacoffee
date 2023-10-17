/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.unfetch = path.resolve(__dirname, 'node_modules/unfetch/dist/unfetch.mjs') // *Code to fix dependecy use of unfetch by mintbase-js/react dependencies

    return config
  },
  experimental: {
    esmExternals: "loose", // *Code to fix dependecy use of unfetch by mintbase-js/react dependencies
  },
  
}

module.exports = nextConfig
