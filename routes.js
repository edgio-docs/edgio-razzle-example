const { Router } = require('@layer0/core/router')
const { razzleRoutes } = require('@layer0/razzle')
const { API_CACHE_HANDLER } = require('./layer0/cache')

module.exports = new Router()
  .match('/api/:path*', API_CACHE_HANDLER)
  .match('/images/:path*', API_CACHE_HANDLER)
  .use(razzleRoutes)
