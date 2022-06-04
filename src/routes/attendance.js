const auth = require('../midlewares/auth')
const attendanceMiddleware = require('../midlewares/attendance')
const routes = require('express').Router()

routes.get('/', auth.adminXhrOnly, attendanceMiddleware.getAttendance)
routes.post('/', attendanceMiddleware.postAttendance)
routes.put('/', auth.adminXhrOnly, attendanceMiddleware.putAttendance)
routes.delete('/', attendanceMiddleware.deleteAttendance)

module.exports = routes