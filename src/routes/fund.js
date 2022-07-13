const fundMiddleware = require('../midlewares/fund')
const routes = require('express').Router()
const auth = require('../midlewares/auth')

routes.get('/', fundMiddleware.getFund)// auth.adminXhrOnly, 
routes.post('/', fundMiddleware.postFund)
routes.put('/', fundMiddleware.putFund)
routes.delete('/', fundMiddleware.deleteFund)

module.exports = routes