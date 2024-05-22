const { laporanModel } = require('../models/laporan.model')
const { logger } = require('./logger')

function getTimeUntilMidnight() {
  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0)
  return midnight.getTime() - now.getTime()
}

async function updateScore() {
  try {
    await laporanModel.updateMany({ status: 'in progress' }, { $inc: { score: 0.2 } })
    logger.info('Data berhasil diperbarui pukul 24.00')
  } catch (error) {
    logger.error('Gagal memperbarui data:', error.message)
  }
}

module.exports = { getTimeUntilMidnight, updateScore }
module.getTimeUntilMidnight = getTimeUntilMidnight
module.updateScore = updateScore
