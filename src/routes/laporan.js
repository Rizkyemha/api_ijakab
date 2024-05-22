const { request, response, Router } = require('express')
const {
  createLaporan,
  getAllLaporan,
  getAllLaporanByUser,
  setLaporanApply,
  setLaporanApprove,
  setProsesLaporan,
  setFinishedLaporan,
  deleteLaporan
} = require('../controllers/laporan.controllers')

const laporanRouter = Router()

// GET http://localhost:4000/laporan
laporanRouter.get('/', getAllLaporan)

// GET http://localhost:4000/laporan/byuser
laporanRouter.get('/byuser', getAllLaporanByUser)

// POST http://localhost:4000/laporan
laporanRouter.post('/', createLaporan)

// UPDATE http://localhost:4000/laporan/apply
laporanRouter.put('/apply', setLaporanApply)

// UPDATE http://localhost:4000/laporan/approve
laporanRouter.put('/approve', setLaporanApprove)

// UPDATE http://localhost:4000/laporan/proccess
laporanRouter.put('/proccess', setProsesLaporan)

// UPDATE http://localhost:4000/laporan/finished
laporanRouter.put('/finished', setFinishedLaporan)

// DELETE hhtp://localhst:4000/laporan
laporanRouter.delete('/', deleteLaporan)

module.exports = { laporanRouter }
module.LaporanRoute = laporanRouter
