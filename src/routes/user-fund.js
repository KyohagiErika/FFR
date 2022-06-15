const auth = require('../midlewares/auth')
const userFundMiddleware = require('../midlewares/user-fund')
const routes = require('express').Router()

routes.get('/', auth.studentOnly, userFundMiddleware.renderFund)

module.exports = routes