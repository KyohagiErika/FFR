const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const config = require('../config')

const registerFace = async (req, res, next) => {
    const data = req.body
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        res.send(xhr.responseText)
    }
    xhr.open('post', config.AI_SERVER_URL+'/api_v3/create')
    xhr.setRequestHeader('Content-Type', 'text/json')
    xhr.send(JSON.stringify({ name: data.name, url: data.url }))
}

const deleteFace = async (req, res, next) => {
    const data = req.body
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        res.send(xhr.responseText)
    }
    xhr.open('post', config.AI_SERVER_URL+'/api_v3/delete')
    xhr.setRequestHeader('Content-Type', 'text/json')
    xhr.send(JSON.stringify({ name: data.name }))
}

const scan = async (req, res, next) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        res.send(xhr.responseText)
    }
    xhr.open('post', config.AI_SERVER_URL+'/api_v3/scan')
}

const list = async (req, res, next) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        res.send(xhr.responseText)
    }
    xhr.open('get', config.AI_SERVER_URL+'/api_v3/list')
    xhr.send()
}

exports.registerFace = registerFace
exports.deleteFace = deleteFace
exports.scan = scan
exports.list = list
