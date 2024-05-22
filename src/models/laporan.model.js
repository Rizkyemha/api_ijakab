const mongoose = require('mongoose')

const laporanSchema = new mongoose.Schema(
  {
    laporan_id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    location: {
      type: String
    },
    email: {
      type: String
    },
    longtitude: {
      type: Number
    },
    latitude: {
      type: Number
    },
    message: {
      type: String
    },
    status: {
      type: String
    },
    infrastucture: {
      type: String
    },
    breakage: {
      type: String
    },
    score: {
      type: Number
    },
    completed_date: {
      type: Date
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
)

const laporanModel = mongoose.model('laporan', laporanSchema, 'laporan')

module.exports = { laporanModel }
module.laporanModel = laporanModel
