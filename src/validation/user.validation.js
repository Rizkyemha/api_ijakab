const Joi = require('joi')

const AuthUserValidation = (payload) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

module.exports = { AuthUserValidation }
module.AuthUserValidation = AuthUserValidation
