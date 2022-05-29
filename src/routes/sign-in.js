const auth = require('../midlewares/auth')
const signInMiddleware = require('../midlewares/sign-in')
const routes = require('express').Router()

routes.get('/', auth.guestOnly, signInMiddleware.renderSignIn)
routes.post('/', auth.guestOnly, signInMiddleware.signIn)

module.exports = routes