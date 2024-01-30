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
    isPending: {
      type: Boolean
    },
    infrastucture: {
      type: String
    },
    breakage: {
      type: String
    },
    isCompleted: {
      type: Boolean
    },
    score: {
      type: Number
    },
    completed_date: {
      type: Date
    }
  },
  { timestamps: true }
)

const laporanModel = mongoose.model('laporan', laporanSchema, 'laporan')

module.exports = { laporanModel }
module.laporanModel = laporanModel
