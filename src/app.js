// Import Section
require('dotenv').config()
const express = require('express')
const expressHandlebars = require('express-handlebars')
const out = require('./lib/out')
// End Import Section

// Environment Constants
const APPLICATION_PORT = process.env.APPLICATION_PORT || 3000
// End Environment Constants

// Express Initialization
const app = express()
app.use(express.static('public'))
app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')
app.use(require('./routes/index'))
// End Express Initialization

// Start App
app.listen(APPLICATION_PORT, () => {
    out.cls()
    out.log(out.important(out.name(`FFR - FCode Face Recognition`)))
    out.log(`License: ${out.success(out.name('MIT'))}`)
    out.log(`Server is running at port ${out.success(APPLICATION_PORT)}`)
    out.log(`${out.danger('Ctrl + C')} to terminate`)
})
// End Start App