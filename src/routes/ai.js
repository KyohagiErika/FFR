const auth = require('../midlewares/auth')
const aiMiddleware = require('../midlewares/ai')
const routes = require('express').Router()

routes.post('/', auth.adminOnly, aiMiddleware.list)
routes.post('/register', auth.adminOnly,aiMiddleware.registerFace)
routes.post('/scan', auth.adminOnly,aiMiddleware.scan)
routes.post('/delete', auth.adminOnly,aiMiddleware.deleteFace)

module.exports = routes