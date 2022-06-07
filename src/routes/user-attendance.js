const auth = require('../midlewares/auth')
const userAttendanceMiddleware = require('../midlewares/user-attendance')
const routes = require('express').Router()

routes.get('/', auth.studentOnly, userAttendanceMiddleware.renderAttendance)

module.exports = routes