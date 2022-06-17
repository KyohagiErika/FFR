const cameraMiddleware = require('../midlewares/camera')
const routes = require('express').Router()
const auth = require('../midlewares/auth')

routes.get('/', auth.adminOnly, cameraMiddleware.renderCameraPage)

module.exports = routes