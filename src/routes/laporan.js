/* eslint-disable no-unused-vars */
const { request, response, Router } = require('express')

const LaporanRouter = Router()

// http://localhost:4000/laporan
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

// http://localhost:4000/edit
LaporanRouter.get('/edit', (request, response) => {
  response.status(200).send({
    status: true,
    statusCode: 200,
    data: {
      name: 'Rizky Mahendra',
      email: 'Rizkymahendra@gmail.com',
      message: 'coba diedit'
    }
  })
})

module.exports = { LaporanRouter }
module.LaporanRoute = LaporanRouter
