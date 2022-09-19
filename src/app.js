// Import Section
const config = require('./config')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const out = require('./lib/out')
// End Import Section

// Express Initialization
const app = express()
app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: config.SESSION_MAX_AGE
    }
}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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