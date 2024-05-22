const { userModel } = require('../models/user.model')
const mongoose = require('mongoose')
const { logger } = require('../utils/logger')

const getAuthUser = async (payload) => {
  const { userName, password } = payload

  const AuthUser = await userModel
    .findOne({ userName, password })
    .then((data) => {
      logger.info(`login admin success - ${data.userName}`)
      return data
    })
    .catch((error) => {
      logger.info(`login admin failed - ${error.message}`)
      return null
    })

  if (!AuthUser) {
    return AuthUser
  }

  const { _id } = AuthUser
  return String(_id)
}

const getUser = async (payload) => {
  const user = await userModel
    .findOne({ _id: new mongoose.Types.ObjectId(`${payload}`) })
    .select('-password')
    .then((data) => {
      logger.info(`get admin profile success - ${payload}`)
      return data
    })
    .catch((error) => {
      logger.info(`get admin profile failed - ${error.message}`)
      return []
    })
  return user
}

module.exports = { getAuthUser, getUser }
module.getAuthUser = getAuthUser
module.getUser = getUser
