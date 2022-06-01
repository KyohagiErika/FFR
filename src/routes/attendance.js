const auth = require('../midlewares/auth')
const attendanceMiddleware = require('../midlewares/attendance')
const routes = require('express').Router()

routes.get('/', auth.studentAndAdminXhrOnly, attendanceMiddleware.getAttendance)
routes.post('/', auth.adminXhrOnly, attendanceMiddleware.postAttendance)
routes.put('/', auth.adminXhrOnly, attendanceMiddleware.putAttendance)
routes.delete('/', auth.adminXhrOnly, attendanceMiddleware.deleteAttendance)

module.exports = routes