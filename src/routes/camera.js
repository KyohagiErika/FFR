const cameraMiddleware = require('../midlewares/camera')
const routes = require('express').Router()
const auth = require('../midlewares/auth')
const upload = require('../midlewares/upload')

routes.get('/', cameraMiddleware.renderCameraPage) //, auth.adminOnly
routes.post('/', upload.uploadImage.single('img'), cameraMiddleware.recognize)//, auth.adminXhrOnly 

module.exports = routes