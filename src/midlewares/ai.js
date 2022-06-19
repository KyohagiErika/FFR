const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const config = require('../config')

const registerFace = async (req, res, next) => {
    const data = req.body
    const xhr = new XMLHttpRequest()
    xhr.open('post', config.AI_SERVER_URL+'/api_v3/create', false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ name: data.name, url: data.url }))
    res.send({ status: xhr.status, responseText: xhr.responseText })
}

const deleteFace = async (req, res, next) => {
    const data = req.body
    const xhr = new XMLHttpRequest()
    xhr.open('post', config.AI_SERVER_URL+'/api_v3/delete', false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ name: data.name }))
    res.send({ status: xhr.status, responseText: xhr.responseText })
}

const scan = async (req, res, next) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', config.AI_SERVER_URL+'/api_v3/scan', false)
    xhr.send()
    res.send({ status: xhr.status, responseText: xhr.responseText })
}

const list = async (req, res, next) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', config.AI_SERVER_URL+'/api_v3/list', false)
    xhr.send()
    res.send({ status: xhr.status, responseText: xhr.responseText })
}

exports.registerFace = registerFace
exports.deleteFace = deleteFace
exports.scan = scan
exports.list = list
