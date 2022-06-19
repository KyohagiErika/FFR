const auth = require('../midlewares/auth')
const indexMiddleware = require('../midlewares/index')
const upload = require('../midlewares/upload')
const fs = require('fs/promises')
const routes = require('express').Router()

routes.get('/test', (req, res, next) => {
    res.render('test', { layout: 'test' });
})
routes.get('/', indexMiddleware.renderHome)
routes.get('/about', indexMiddleware.renderAbout)
routes.get('/logout', auth.studentOnly, indexMiddleware.logout)
routes.use('/info', require('./info'))
routes.use('/sign-in', require('./sign-in'))
routes.use('/student', require('./student'))
routes.use('/account', require('./account'))
routes.use('/attendance', require('./attendance'))
routes.use('/fund', require('./fund'))
routes.use('/admin', require('./admin'))
routes.use('/user-attendance', require('./user-attendance'))
routes.use('/user-fund', require('./user-fund'))
routes.use('/user-profile', require('./user-profile'))
routes.use(indexMiddleware.render404)
routes.use(indexMiddleware.render500)

module.exports = routes