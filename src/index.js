const express = require("express")
const { routes } = require('./routes')
const { CONFIG } = require("./config")
const { logger } = require('./utils/logger')

const app = express()
const port = CONFIG.PORT

routes(app)

app.listen(port, () => logger.info(`Server listening on port ${port}`))