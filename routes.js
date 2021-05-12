const { Router } = require('@layer0/core/router')
const { razzleRoutes } = require('@layer0/razzle')

module.exports = new Router().use(razzleRoutes)
