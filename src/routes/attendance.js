const auth = require('../midlewares/auth')
const attendanceMiddleware = require('../midlewares/attendance')
const routes = require('express').Router()

routes.get('/', attendanceMiddleware.getAttendance)//, auth.adminXhrOnly
routes.post('/', attendanceMiddleware.postAttendance)
routes.put('/', attendanceMiddleware.putAttendance)
routes.delete('/', attendanceMiddleware.deleteAttendance)

module.exports = routes