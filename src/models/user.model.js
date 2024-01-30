const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    userName: {
      type: String
    },
    password: {
      type: String
    },
    role: {
      type: String
    }
  },
  { timestamp: true }
)

const userModel = mongoose.model('user', userSchema, 'user')

module.exports = { userModel }
module.userModel = userModel
