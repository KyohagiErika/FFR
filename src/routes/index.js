const indexMiddleware = require('../midlewares/index')
const routes = require('express').Router()

routes.get('/', indexMiddleware.renderHome)
routes.get('/about', indexMiddleware.renderAbout)
routes.get('/sign-in', indexMiddleware.renderSignIn)
routes.use(indexMiddleware.render404)
routes.use(indexMiddleware.render500)

module.exports = routes