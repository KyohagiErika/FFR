const routes = require('express').Router()

routes.get('/', (req, res, next) => {
    res.status(200).send('Hello Fund!')
})

module.exports = routes