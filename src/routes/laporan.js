/* eslint-disable no-unused-vars */
const { request, response, Router } = require('express')
const { logger } = require('../utils/logger')

const LaporanRouter = Router()

// GET http://localhost:4000/laporan
LaporanRouter.get('/', (request, response) => {
  response.status(200).send({
    status: true,
    statusCode: 200,
    data: {
      name: 'Rizky Mahendra',
      email: 'Rizkymahendra@gmail.com',
      message: 'ada lobang dijalan ini'
    }
  })
})

// POST http://localhost:4000/laporan
LaporanRouter.post('/', (request, response) => {
  logger.info('Success post new Laporan')
  response.status(200).send({ status: true, statusCode: '200', data: request.body })
})

module.exports = { LaporanRouter }
module.LaporanRoute = LaporanRouter
