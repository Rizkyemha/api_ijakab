const { laporanModel } = require('../models/laporan.model')
const { logger } = require('../utils/logger')
const mongoose = require('mongoose')

const getLaporan = async () => {
  return await laporanModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Data laporan not found')
      return []
    })
}

// insert for user - note, butuh handling error
const insertLaporan = async (payload) => {
  const { name, email, longtitude, latitude, message } = payload
  return await laporanModel.create({
    name,
    email,
    longtitude,
    latitude,
    message,
    isPending: true
  })
}

const applyLaporan = async (payload, score) => {
  const { _id, infrastucture, breakage } = await payload
  const id = new mongoose.Types.ObjectId(_id)
  console.log(_id, infrastucture, breakage, score)
  await laporanModel.updateOne(
    { _id: id },
    {
      infrastucture,
      breakage,
      score,
      isPending: false,
      isCompleted: false
    }
  )
  const laporan = await laporanModel
    .findOne(id)
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Data laporan not found')
      return []
    })
  console.log(laporan)
  return laporan
}

const setProccessLaporan = async (payload) => {
  const { _id, isCompleted } = await payload
  const id = new mongoose.Types.ObjectId(_id)

  await laporanModel.updateOne(
    { _id: id },
    {
      isCompleted: isCompleted ? false : true
    }
  )
  const laporan = await laporanModel
    .findOne(id)
    .then((data) => {
      console.log('disini', data)
      return data
    })
    .catch((error) => {
      logger.info('Data laporan not found')
      return []
    })
  return laporan
}

module.exports = { getLaporan, insertLaporan, applyLaporan, setProccessLaporan }
module.getLaporan = getLaporan
module.insertLaporan = insertLaporan
module.applyLaporan = applyLaporan
module.setProccessLaporan = setProccessLaporan
