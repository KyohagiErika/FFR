const routes = require('express').Router()

routes.get('/', (req, res, next) => {
    const data = {
        name: "Long",
        age: 19
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
})

module.exports = routes