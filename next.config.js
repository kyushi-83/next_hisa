const urlPrefix = '/docs'

module.exports = {
  assetPrefix: process.env.GITHUB_PAGES ? 'https://kyushi-83.github.io/next_hisa/' : '',
  basePath: process.env.GITHUB_PAGES ? "https://kyushi-83.github.io/next_hisa/" : "",
  trailingSlash: true,
}