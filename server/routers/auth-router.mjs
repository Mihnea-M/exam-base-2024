import express from 'express'
import controllers from './controllers/index.mjs'

const authRouter = express.Router()

authRouter.post('/login', controllers.auth.login)
authRouter.post('/register', controllers.auth.register)
authRouter.post('/logout', controllers.auth.logout)

export default authRouter
