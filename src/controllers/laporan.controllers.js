const { request, response } = require('express')
const {
  createLaporanValidation,
  applyLaporanValidation,
  setApproveLaporanValidation,
  setProccessLaporanValidation,
  setFinishedLaporanValidation,
  deleteLaporanValidation
} = require('../validation/laporan.validation')
const { logger } = require('../utils/logger')
const { reduceImageSize } = require('../utils/reduceImg')
const {
  getLaporan,
  getLaporanByUser,
  insertLaporan,
  applyLaporan,
  setApproveLaporan,
  setProccessLaporan,
  setFinishedLaporanServices,
  deleteLaporanServices
} = require('../services/laporan.service')
const { auth } = require('../utils/verify')
const { CONFIG } = require('../config')
const { generateScore } = require('../utils/score')

const getAllLaporan = async (request, response) => {
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  if (!token) {
    return response.status(422).send({ status: false, statusCode: '422', message: 'Token not exist', data: {} })
  }
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Invalid or expired token', data: {} })
  }

  const datas = await getLaporan()
  if (datas.length === 0) {
    logger.info('GET LAPORAN : LAPORAN NOT FOUND')
    return response.status(404).send({ status: true, statusCode: 404, message: 'Laporan not found', data: [] })
  }

  logger.info('GET LAPORAN : LAPORAN RECAIVED')
  return response.status(200).send({ status: true, statusCode: 200, data: datas })
}

const getAllLaporanByUser = async (request, response) => {
  const datas = await getLaporanByUser()
  if (datas.length === 0) {
    logger.info('GET LAPORAN : LAPORAN NOT FOUND')
    return response.status(404).send({ status: true, statusCode: 404, message: 'Laporan not found', data: {} })
  }

  logger.info('GET LAPORAN : LAPORAN RECAIVED')
  return response.status(200).send({ status: true, statusCode: 200, data: datas })
}

const createLaporan = async (request, response) => {
  // sudah oke
  const img = await reduceImageSize(request.body.image)
  const { error, value } = createLaporanValidation({ ...request.body, image: img })

  if (error) {
    logger.error('Request body on POST Laporan is notfully, ' + error.details[0].message)
    return response.status(422).send({ status: false, statusCode: '422', message: error.details[0].message, data: {} })
  }

  try {
    const laporan = await insertLaporan(value)

    logger.info('Success post new Laporan')
    return response.status(200).send({
      status: true,
      statusCode: '200',
      message: 'Create laporan success',
      data: laporan
    })
  } catch (error) {
    logger.info(`Create laporan failed - ${error.message}`)
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: `Create laporan failed - ${error.message}`, data: {} })
  }
}

const setLaporanApply = async (request, response) => {
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Update laporan failed - Token not exist', data: {} })
  }

  const { error, value } = applyLaporanValidation(request.body)
  if (error) {
    logger.error('Request body on Apply Laporan is notfully, ' + error.details[0].message)
    return response.status(422).send({ status: false, statusCode: '422', message: error.details[0].message, data: {} })
  }

  const score = generateScore(value.infrastucture, value.breakage)

  try {
    const laporan = await applyLaporan(value, score)
    logger.info('Success apply Laporan', laporan)
    return response
      .status(200)
      .send({ status: true, statusCode: '200', message: 'Apply laporan successful', data: laporan })
  } catch (error) {
    logger.info(`Create laporan failed - ${error.message}`)
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: `Apply laporan failed - ${error.message}`, data: {} })
  }
}

const setLaporanApprove = async (request, response) => {
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Update laporan failed - Token not exist', data: {} })
  }

  const { error, value } = setApproveLaporanValidation(request.body)

  if (error) {
    logger.error('Request body on Apply Laporan is notfully, ' + error.details[0].message)
    return response.status(422).send({ status: false, statusCode: '422', message: error.details[0].message, data: {} })
  }

  try {
    const laporan = await setApproveLaporan(value)
    logger.info('set approve laporan success')
    return response
      .status(200)
      .send({ status: true, statusCode: '200', message: 'set approve laporan success', data: laporan })
  } catch (error) {
    logger.info(`set proccess laporan failed - ${error.message}`)
    return response.status(422).send({ status: false, statusCode: '422', message: error.message, data: {} })
  }
}

const setProsesLaporan = async (request, response) => {
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Update laporan failed - Token not exist', data: {} })
  }

  const { error, value } = setProccessLaporanValidation(request.body)

  if (error) {
    logger.error('Request body on Apply Laporan is notfully, ' + error.details[0].message)
    return response.status(422).send({ status: false, statusCode: '422', message: error.details[0].message, data: {} })
  }

  try {
    const laporan = await setProccessLaporan(value)
    logger.info('set proccess laporan success')
    return response
      .status(200)
      .send({ status: true, statusCode: '200', message: 'set proses laporan success', data: laporan })
  } catch (error) {
    logger.info(`set proccess laporan failed - ${error.message}`)
    return response.status(422).send({ status: false, statusCode: '422', message: error.message, data: {} })
  }
}

const setFinishedLaporan = async (request, response) => {
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Update laporan failed - Token not exist', data: {} })
  }

  const { error, value } = setFinishedLaporanValidation(request.body)

  if (error) {
    logger.error('Request body on Apply Laporan is notfully, ' + error.details[0].message)
    return response.status(422).send({ status: false, statusCode: '422', message: error.details[0].message, data: {} })
  }

  try {
    const laporan = await setFinishedLaporanServices(value)
    logger.info('set finished laporan success')
    return response
      .status(200)
      .send({ status: true, statusCode: '200', message: 'set proses laporan success', data: laporan })
  } catch (error) {
    logger.info(`set finished laporan failed - ${error.message}`)
    return response.status(422).send({ status: false, statusCode: '422', message: error.message, data: {} })
  }
}

const deleteLaporan = async (request, response) => {
  // belum selesai
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Update laporan failed - Token not exist', data: {} })
  }

  const { error, value } = deleteLaporanValidation(request.body)

  if (error) {
    logger.error('Request body on Delete Laporan is notfully, ' + error.details[0].message)
    return response.status(422).send({ status: false, statusCode: '422', message: error.details[0].message, data: {} })
  }

  try {
    const laporan = await deleteLaporanServices(value)
    logger.info('delete laporan success')
    return response
      .status(200)
      .send({ status: true, statusCode: '200', message: 'delete laporan success', data: laporan })
  } catch (error) {
    logger.info(`delete laporan failed - ${error.message}`)
    return response.status(422).send({ status: false, statusCode: '422', message: error.message, data: {} })
  }
}

module.exports = {
  createLaporan,
  getAllLaporan,
  getAllLaporanByUser,
  setLaporanApply,
  setLaporanApprove,
  setProsesLaporan,
  setFinishedLaporan,
  deleteLaporan
}
module.createLaporan = createLaporan
module.getAllLaporan = getAllLaporan
module.getAllLaporanByUser = getAllLaporanByUser
module.setLaporanApply = setLaporanApply
module.setLaporanApprove = setLaporanApprove
module.setProsesLaporan = setProsesLaporan
module.setFinishedLaporan = setFinishedLaporan
module.deleteLaporan = deleteLaporan
