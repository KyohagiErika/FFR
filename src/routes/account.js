const auth = require('../midlewares/auth')
const accountMiddleware = require('../midlewares/account')
const routes = require('express').Router()

routes.get('/', auth.adminXhrOnly, accountMiddleware.getAccount)
routes.post('/', auth.adminXhrOnly, accountMiddleware.postAccount)
routes.put('/', auth.studentAndAdminXhrOnly, accountMiddleware.putAccount)
routes.delete('/', auth.adminXhrOnly,accountMiddleware.deleteAccount)

module.exports = routes