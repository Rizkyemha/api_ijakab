const express = require('express')
const { routes } = require('./routes')
const { CONFIG } = require('./config')
const { logger } = require('./utils/logger')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = CONFIG.PORT

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.listen(port, () => logger.info(`Server listening on port ${port}`))
