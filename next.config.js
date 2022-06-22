const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/docs' : '',
  basePath: process.env.GITHUB_ACTIONS ? "/repository_name" : "",
  trailingSlash: true
};