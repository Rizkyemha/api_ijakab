const { laporanModel } = require('../models/laporan.model')
const { logger } = require('../utils/logger')
const { v4: uuidv4 } = require('uuid')

const getLaporan = async () => {
  return await laporanModel
    .find()
    .select('-_id')
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Data laporan not found')
      return []
    })
}

const getLaporanByUser = async () => {
  return laporanModel
    .find({ status: { $nin: ['awaiting approval', 'completed'] } })
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
  const { name, location, email, longtitude, latitude, message, image } = payload
  const laporan_id = uuidv4()
  return await laporanModel.create({
    laporan_id,
    name,
    location,
    email,
    longtitude,
    latitude,
    message,
    status: 'awaiting approval', // awaiting approval, approved, in proses, completed
    image
  })
}

const applyLaporan = async (payload, score) => {
  const { laporan_id, infrastucture, breakage } = await payload
  await laporanModel.updateOne(
    { laporan_id },
    {
      infrastucture,
      breakage,
      score,
      status: 'approved'
    }
  )
  const laporan = await laporanModel
    .findOne({ laporan_id })
    .select('-_id')
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

const setApproveLaporan = async (payload) => {
  const { laporan_id } = await payload

  await laporanModel.updateOne(
    { laporan_id },
    {
      status: 'approved'
    }
  )
  const laporan = await laporanModel
    .findOne({ laporan_id })
    .select('-_id')
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

const setProccessLaporan = async (payload) => {
  const { laporan_id } = await payload

  await laporanModel.updateOne(
    { laporan_id },
    {
      status: 'in progress'
    }
  )
  const laporan = await laporanModel
    .findOne({ laporan_id })
    .select('-_id')
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

const setFinishedLaporanServices = async (payload) => {
  const { laporan_id } = await payload
  const currentDate = new Date()

  await laporanModel.updateOne(
    { laporan_id },
    {
      status: 'finished',
      completed_date: currentDate
    }
  )
  const laporan = await laporanModel
    .findOne({ laporan_id })
    .select('-_id')
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

const deleteLaporanServices = async (payload) => {
  try {
    const { laporan_id } = await payload
    await laporanModel.deleteOne({ laporan_id })
    return true
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getLaporan,
  getLaporanByUser,
  insertLaporan,
  applyLaporan,
  setProccessLaporan,
  setApproveLaporan,
  setFinishedLaporanServices,
  deleteLaporanServices
}
module.getLaporan = getLaporan
module.getLaporanByUser = getLaporanByUser
module.insertLaporan = insertLaporan
module.applyLaporan = applyLaporan
module.setApproveLaporan = setApproveLaporan
module.setProccessLaporan = setProccessLaporan
module.setFinishedLaporanServices = setFinishedLaporanServices
module.deleteLaporanServices = deleteLaporanServices
