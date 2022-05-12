const indexMiddleware = require('../midlewares/index')
const routes = require('express').Router()

routes.get('/', indexMiddleware.renderHome)
routes.use(indexMiddleware.render404)
routes.use(indexMiddleware.render500)

module.exports = routes