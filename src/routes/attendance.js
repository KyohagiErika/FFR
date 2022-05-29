const attendanceMiddleware = require('../midlewares/attendance')
const routes = require('express').Router()

routes.get('/', attendanceMiddleware.getAttendance)
routes.post('/', attendanceMiddleware.postAttendance)
routes.put('/', attendanceMiddleware.putAttendance)
routes.delete('/', attendanceMiddleware.deleteAttendance)

module.exports = routes