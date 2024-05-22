const Joi = require('joi')

const createLaporanValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    email: Joi.string().required(),
    longtitude: Joi.number().required(),
    latitude: Joi.number().required(),
    message: Joi.string().required(),
    image: Joi.string().required()
  })

  return schema.validate(payload)
}

const applyLaporanValidation = (payload) => {
  const schema = Joi.object({
    laporan_id: Joi.string().required(),
    infrastucture: Joi.string().required(),
    breakage: Joi.string().required()
  })

  return schema.validate(payload)
}

const setApproveLaporanValidation = (payload) => {
  const schema = Joi.object({
    laporan_id: Joi.string().required()
  })

  return schema.validate(payload)
}

const setProccessLaporanValidation = (payload) => {
  const schema = Joi.object({
    laporan_id: Joi.string().required()
  })

  return schema.validate(payload)
}

const setFinishedLaporanValidation = (payload) => {
  const schema = Joi.object({
    laporan_id: Joi.string().required()
  })

  return schema.validate(payload)
}

const deleteLaporanValidation = (payload) => {
  const schema = Joi.object({
    laporan_id: Joi.string().required()
  })

  return schema.validate(payload)
}

module.exports = {
  createLaporanValidation,
  applyLaporanValidation,
  setApproveLaporanValidation,
  setProccessLaporanValidation,
  setFinishedLaporanValidation,
  deleteLaporanValidation
}
module.createLaporanValidation = createLaporanValidation
module.applyLaporanValidation = applyLaporanValidation
module.setApproveLaporanValidation = setApproveLaporanValidation
module.setProccessLaporanValidation = setProccessLaporanValidation
module.setFinishedLaporanValidation = setFinishedLaporanValidation
module.deleteLaporanValidation = deleteLaporanValidation
