const express = require('express')
const { routes } = require('./routes')
const { CONFIG } = require('./config')
const { logger } = require('./utils/logger')
const bodyParser = require('body-parser')
const cors = require('cors')

// connect DB
const { connectDB } = require('./utils/connectDB.JS')

const app = express()
const port = CONFIG.PORT

// parse body request
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }))
app.use(bodyParser.json({ limit: '25mb', extended: true }))

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
