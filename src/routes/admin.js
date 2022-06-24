const auth = require('../midlewares/auth')
const adminMiddleware = require('../midlewares/admin')
const routes = require('express').Router()

routes.get('/', auth.guestOnly, adminMiddleware.renderLogin)
routes.post('/', auth.guestOnly, adminMiddleware.login)
routes.get('/dashboard', auth.adminOnly, adminMiddleware.renderDashboard)
routes.get('/logout', auth.adminOnly, adminMiddleware.logout)
routes.get('/face-register', auth.adminOnly, adminMiddleware.renderRegisterFace)

module.exports = routes