const fundMiddleware = require('../midlewares/fund')
const routes = require('express').Router()
const auth = require('../midlewares/auth')

routes.get('/', auth.adminXhrOnly, fundMiddleware.getFund)
routes.post('/', auth.adminXhrOnly, fundMiddleware.postFund)
routes.put('/', auth.adminXhrOnly, fundMiddleware.putFund)
routes.delete('/', auth.adminXhrOnly, fundMiddleware.deleteFund)

module.exports = routes