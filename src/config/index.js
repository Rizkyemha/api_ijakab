require('dotenv').config()

const CONFIG = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  SK: process.env.SK
}

module.exports = { CONFIG }
module.CONFIG = CONFIG
