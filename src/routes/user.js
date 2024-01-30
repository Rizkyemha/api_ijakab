const { Router } = require('express')
const { login, getAdmin } = require('../controllers/user.controler')

const userRouter = Router()

// POST http://localhost:4000/user/login
userRouter.post('/login', login)

// GET http://localhost:4000/user
userRouter.get('/', getAdmin)

module.exports = { userRouter }
module.userRouter = userRouter
