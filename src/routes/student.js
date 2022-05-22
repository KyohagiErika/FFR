const studentMiddleware = require('../midlewares/student')
const routes = require('express').Router()

routes.get('/', studentMiddleware.getStudent)
routes.post('/', studentMiddleware.postStudent)
routes.put('/', studentMiddleware.putStudent)
routes.delete('/', studentMiddleware.deleteStudent)

module.exports = routes