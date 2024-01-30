const { request, response, Router } = require('express')
const {
  createLaporan,
  getAllLaporan,
  setLaporanApply,
  setProsesLaporan
} = require('../controllers/laporan.controllers')

const laporanRouter = Router()

// GET http://localhost:4000/laporan
laporanRouter.get('/', getAllLaporan)

// POST http://localhost:4000/laporan
laporanRouter.post('/', createLaporan)

// UPDATE http://localhost:4000/laporan/apply
laporanRouter.put('/apply', setLaporanApply)

// UPDATE http://localhost:4000/laporan/proccess
laporanRouter.put('/proccess', setProsesLaporan)

module.exports = { laporanRouter }
module.LaporanRoute = laporanRouter
