const auth = require('../midlewares/auth')
const indexMiddleware = require('../midlewares/index')
const routes = require('express').Router()

routes.get('/', indexMiddleware.renderHome)
routes.get('/about', indexMiddleware.renderAbout)
routes.get('/sign-in', auth.guestOnly, indexMiddleware.renderSignIn)
routes.use('/student', auth.adminXhrOnly, require('./student'))
routes.use('/account', auth.adminXhrOnly, require('./account'))
routes.use('/fund', require('./fund'))
routes.use(indexMiddleware.render404)
routes.use(indexMiddleware.render500)

module.exports = routes