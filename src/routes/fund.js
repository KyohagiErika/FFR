const fundMiddleware = require('../midlewares/fund')
const routes = require('express').Router()

routes.get('/', fundMiddleware.getFund)

module.exports = routes