const mongoose = require('mongoose')
const { CONFIG } = require('../config')
const { logger } = require('./logger')
const { updateScore, getTimeUntilMidnight } = require('./updateScore')

const connectDB = mongoose
  .connect(CONFIG.DB)
  .then(() => {
    logger.info('Connect to MongoDB')
    setTimeout(function () {
      updateScore()
      setInterval(updateScore, 24 * 60 * 60 * 1000)
    }, getTimeUntilMidnight())
    logger.info('Set auto update score success')
  })
  .catch((error) => {
    logger.info(`Cant connect to MongoDB, ${error.message}`)
    logger.error(error)
    process.exit(1)
  })

module.exports = { connectDB }
module.connectDB = connectDB
