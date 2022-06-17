const routes = require('express').Router()

routes.use('/attendance', require('./user-attendance'))
routes.use('/fund', require('./user-fund'))
routes.use('/profile', require('./user-profile'))

module.exports = routes