const fundMiddleware = require('../midlewares/fund')
const routes = require('express').Router()

routes.get('/', fundMiddleware.getFund)
routes.post('/', fundMiddleware.postFund)
routes.put('/', fundMiddleware.putFund)
routes.delete('/', fundMiddleware.deleteFund)

module.exports = routes