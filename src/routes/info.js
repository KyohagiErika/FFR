const auth = require('../midlewares/auth')
const infoMiddleware = require('../midlewares/info')
const routes = require('express').Router()

routes.get('/', auth.studentOnly, infoMiddleware.rederInfo)
routes.put('/', auth.studentXhrOnly, infoMiddleware.editInfo)

module.exports = routes