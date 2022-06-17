const auth = require('../midlewares/auth')
const studentMiddleware = require('../midlewares/student')
const routes = require('express').Router()

routes.get('/', studentMiddleware.getStudent)//auth.adminXhrOnly,
routes.post('/', auth.adminXhrOnly, studentMiddleware.postStudent)
routes.put('/', auth.studentAndAdminXhrOnly, studentMiddleware.putStudent)
routes.delete('/', auth.adminXhrOnly, studentMiddleware.deleteStudent)

module.exports = routes