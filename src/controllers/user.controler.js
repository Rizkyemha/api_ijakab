const { request, response } = require('express')
const { AuthUserValidation } = require('../validation/user.validation')
const { logger } = require('../utils/logger')
const { getAuthUser, getUser } = require('../services/user.service')
const { token, auth } = require('../utils/verify')
const { CONFIG } = require('../config')

const login = async (request, response) => {
  const { value, error } = AuthUserValidation(request.body)

  if (error) {
    logger.info('AUTHUSER FAILDE, ' + `${error.details[0].message}`)
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: `Login failed, ${error.details[0].message}`, data: {} })
  }

  const userData = await getAuthUser(value)

  if (!userData) {
    logger.info('AUTHUSER - User Not Found')
    return response
      .status(404)
      .send({ status: false, statusCode: '404', message: 'Failde to login - User Not Found', data: {} })
  }

  const jwtToken = await token(userData)

  logger.info(`AUTHUSER - ${value.userName} Success to login`)
  return response.status(200).send({ status: true, statusCode: '200', message: 'Success to login', token: jwtToken })
}

const getAdmin = async (request, response) => {
  const token = request.header('Authorization') // admin update laporan menggunakan ini
  const secret = new TextEncoder().encode(CONFIG.SK)
  const idUser = await auth(token, secret)

  if (!idUser) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: 'Update laporan failed - Token not exist', data: {} })
  }

  try {
    const admin = await getUser(idUser)
    return response.status(200).send({ status: true, statusCode: '200', message: 'get profile success ', data: admin })
  } catch (error) {
    return response
      .status(422)
      .send({ status: false, statusCode: '422', message: `get profile failed - ${error.message}`, data: {} })
  }
}

module.exports = { login, getAdmin }
module.login = login
module.getAdmin = getAdmin
