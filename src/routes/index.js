const indexMiddleware = require('../midlewares/index')
const routes = require('express').Router()

routes.get('/', indexMiddleware.renderHome)

module.exports = routes