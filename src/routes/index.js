const { HealthRouter } = require('./health')
const { LaporanRouter } = require('./laporan')

// router list
const _routes = [
  ['/health', HealthRouter],
  ['/laporan', LaporanRouter]
]

// router regis
const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = { routes }
module.routes = routes
