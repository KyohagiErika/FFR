const auth = require('../midlewares/auth')
const userProfileMiddleware = require('../midlewares/user-profile')
const routes = require('express').Router()

routes.get('/', auth.studentOnly, userProfileMiddleware.renderProfile)

module.exports = routes