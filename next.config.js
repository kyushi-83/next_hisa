const isProd = process.env.NODE_ENV === 'production'
const prefixPath = !isProd ? '/next_hisa' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: prefixPath,
  basePath: prefixPath,
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig