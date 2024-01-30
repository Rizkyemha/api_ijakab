const { healthRouter } = require('./health')
const { laporanRouter } = require('./laporan')
const { userRouter } = require('./user')

// router list
const _routes = [
  ['/health', healthRouter],
  ['/laporan', laporanRouter],
  ['/user', userRouter]
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
