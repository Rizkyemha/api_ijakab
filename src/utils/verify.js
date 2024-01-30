const jose = require('jose')
const { CONFIG } = require('../config')

const token = async (payload) => {
  const secret = new TextEncoder().encode(CONFIG.SK)
  const alg = 'HS256'

  const jwt = await new jose.SignJWT({ status: true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('ijakab')
    .setExpirationTime('1h')
    .setSubject({ payload })
    .sign(secret)

  return jwt
}

const auth = async (jwt, secret) => {
  const { payload } = await jose.jwtVerify(jwt, secret, {
    issuer: 'ijakab'
  })
  const _id = payload.sub.payload
  return _id
}

module.exports = { token, auth }
module.token = token
module.auth = auth
