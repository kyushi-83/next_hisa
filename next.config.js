/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? "/repository_name" : "",
  trailingSlash: true,
}

module.exports = nextConfig

// ESLintの設定 eslint-disable を追加する
/* eslint-disable
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/