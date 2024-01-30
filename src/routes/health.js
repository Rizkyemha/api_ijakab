/* eslint-disable no-unused-vars */
const { request, response, Router } = require('express')
const { logger } = require('../utils/logger')

const healthRouter = Router()

// http://localhost:4000/health
healthRouter.get('/', (request, response) => {
  logger.info('Health check success')
  response.status(200).send({ status: '200' })
})

module.exports = { healthRouter }
module.HealthRouter = healthRouter
