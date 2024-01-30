const Joi = require('joi')

const createLaporanValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    longtitude: Joi.number().required(),
    latitude: Joi.number().required(),
    message: Joi.string().required()
  })

  return schema.validate(payload)
}

const applyLaporanValidation = (payload) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    infrastucture: Joi.string().required(),
    breakage: Joi.string().required()
  })

  return schema.validate(payload)
}

const setProccessLaporanValidation = (payload) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    isCompleted: Joi.boolean().required()
  })

  return schema.validate(payload)
}

module.exports = { createLaporanValidation, applyLaporanValidation, setProccessLaporanValidation }
module.createLaporanValidation = createLaporanValidation
module.applyLaporanValidation = applyLaporanValidation
module.setProccessLaporanValidation = setProccessLaporanValidation
