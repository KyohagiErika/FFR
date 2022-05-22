const accountMiddleware = require('../midlewares/account')
const routes = require('express').Router()

routes.get('/', accountMiddleware.getAccount)
routes.post('/', accountMiddleware.postAccount)
routes.put('/', accountMiddleware.putAccount)
routes.delete('/', accountMiddleware.deleteAccount)

module.exports = routes