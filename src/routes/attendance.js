const auth = require('../midlewares/auth')
const attendanceMiddleware = require('../midlewares/attendance')
const routes = require('express').Router()

routes.get('/', auth.adminXhrOnly, attendanceMiddleware.getAttendance)
routes.post('/', auth.adminXhrOnly, attendanceMiddleware.postAttendance)
routes.put('/', auth.adminXhrOnly, attendanceMiddleware.putAttendance)
<<<<<<< HEAD
routes.delete('/',auth.adminXhrOnly, attendanceMiddleware.deleteAttendance)
=======
routes.delete('/', auth.adminXhrOnly, attendanceMiddleware.deleteAttendance)
>>>>>>> 1188235961674c892040b86f1b4fcc80bb214f03

module.exports = routes