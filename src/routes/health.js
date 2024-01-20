const { request, response, Router } = require("express")
const { logger } = require('../utils/logger')

const HealthRouter = Router()

//http://localhost:4000/health
HealthRouter.get('/', (request, response) => {
    logger.info('Health check success')
    response.status(200).send({status: '200'})
})

module.exports = { HealthRouter }
module.HealthRouter = HealthRouter