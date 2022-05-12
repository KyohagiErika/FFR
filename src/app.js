// Import Section
require('dotenv').config()
const express = require('express')
const expressHandlebars = require('express-handlebars')
// End Import Section

// Environment Constants
const APPLICATION_PORT = process.env.APPLICATION_PORT || 3000
// End Environment Constants

// Express Initialization
const app = express()
app.use(express.static('public'))
app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')
// End Express Initialization

// Express Routing
app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})
// End Express Routing

// 404 - Not Found Error
app.use((req, res, next) => {
    res.status(404).end()
})
// End 404 - Not Found Error

// 500 - Server Error
app.use((err, req, res, next) => {
    res.status(500).end()
})
// 500 - End Server Error

// Start App
app.listen(APPLICATION_PORT, () => console.log(`Server is running at ${APPLICATION_PORT}`))
// End Start App