const urlPrefix = '/docs'

module.exports = {
  assetPrefix: process.env.GITHUB_PAGES ? '/repository_name' : '',
  basePath: process.env.GITHUB_PAGES ? "/repository_name/" : "",
  trailingSlash: true,
}