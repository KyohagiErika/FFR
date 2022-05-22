// Import Section
const config = require('./config')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multer = require('multer')
const session = require('express-session')
const upload = multer({
    dest: 'uploads/'
})
const out = require('./lib/out')
// End Import Section

// Express Initialization
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 24*3600*1000,
        secure: true
    }
}))
app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')
app.use(require('./routes/index'))
// End Express Initialization

// Start App
app.listen(config.APPLICATION_PORT, () => {
    out.cls()
    out.log(out.important(out.name(`FFR - FCode Face Recognition`)))
    out.log(`License: ${out.success(out.name('MIT'))}`)
    out.log(`Server is running at port ${out.success(config.APPLICATION_PORT)}`)
    out.log(`${out.danger('Ctrl + C')} to terminate`)
})
// End Start App