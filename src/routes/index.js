const auth = require('../midlewares/auth')
const indexMiddleware = require('../midlewares/index')
const upload = require('../midlewares/upload')
const fs = require('fs/promises')
const routes = require('express').Router()

routes.get('/test', (req, res, next) => {
    res.render('test', { layout: 'test' })
})
//routes.get('/test', studentMiddleware.getStudent)
// routes.post('/test', upload.uploadImage.single('img'), async (req, res, next) => {
//     const file = req.file
//     if (file) {
//         if (file.mimetype.split('/')[0] !== 'image') {
//             await fs.unlink(file.path)
//             if (req.xhr) {
//                 res.status(400).send('Your uploaded file is not an image!')
//             } else {
//                 res.render('test', { layout: 'test', message: 'Your uploaded file is not an image!' })
//             }
//         } else {
//             const realPath = file.path.replace('public', '')
//             if (req.xhr) {
//                 res.send(realPath)
//             } else {
//                 res.render('test', { layout: 'test', imgPath: realPath })
//             }
//         }
//     } else {
//         if (req.xhr) {
//             res.status(400).send('Empty sent data!')
//         } else {
//             res.render('test', { layout: 'test', message: 'Empty sent data!' })
//         }
//     }
// })
routes.get('/', indexMiddleware.renderHome)
routes.get('/about', indexMiddleware.renderAbout)
routes.get('/logout', auth.studentOnly, indexMiddleware.logout)
routes.use('/info', require('./info'))
routes.use('/sign-in', require('./sign-in'))
routes.use('/student', require('./student'))
routes.use('/account', require('./account'))
routes.use('/attendance', require('./attendance'))
routes.use('/fund', require('./fund'))
routes.use('/admin', require('./admin'))
routes.use('/user', require('./user'))
routes.use('/camera', require('./camera'))
routes.use('/ai', require('./ai'))
routes.use(indexMiddleware.render404)
routes.use(indexMiddleware.render500)

module.exports = routes