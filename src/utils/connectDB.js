const mongoose = require('mongoose')
const { CONFIG } = require('../config')
const { logger } = require('./logger')

const connectDB = mongoose
  .connect(CONFIG.DB)
  .then(() => {
    logger.info('Connect to MongoDB')
  })
  .catch((error) => {
    logger.info('Cant connect to MongoDB')
    logger.error(error)
    process.exit(1)
  })

module.exports = { connectDB }
module.connectDB = connectDB
