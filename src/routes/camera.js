const cameraMiddleware = require('../midlewares/camera')
const routes = require('express').Router()
const auth = require('../midlewares/auth')
const upload = require('../midlewares/upload')

routes.get('/', auth.adminOnly, cameraMiddleware.renderCameraPage)
routes.post('/', auth.adminXhrOnly, upload.uploadImage.single('img'), cameraMiddleware.recognize)

module.exports = routes