const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const config = require('../config')
const fs = require("fs/promises");
const RSC = require("../lib/response-status-code");

const registerFace = async (req, res, next) => {
    const data = req.body
    const file = req.file
    if (file) {
        if (file.mimetype.split('/')[0] !== 'image') {
            await fs.unlink(file.path).catch(next)
            res.status(RSC.BAD_REQUEST).send('Your uploaded file is not an image!')
        } else {
            let realPath = req.protocol + "://" + req.headers["host"] + file.path.replace('public', '')
            realPath = realPath.replaceAll('\\', '/')
            console.log(realPath)
            const xhr = new XMLHttpRequest()
            xhr.open('post', config.AI_SERVER_URL+'/api_v3', false)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({ url: realPath, name: data.studentId }))
            if (xhr.status === 200) {
                const xhrRes = JSON.parse(xhr.responseText)
                if (xhrRes.name === 0) {
                    res.status(RSC.BAD_REQUEST).send('Can\'t recognize!')
                } else {
                    res.send(xhrRes)
                }
            } else {
                res.status(RSC.BAD_REQUEST).send('AI Server error with message: '+xhr.responseText)
                // res.status(RSC.BAD_REQUEST).send(xhr.responseText)
            }
            await fs.unlink(file.path).catch(next)
        }
    } else {
        res.status(RSC.BAD_REQUEST).send('Empty sent data!')
    }
    // const xhr = new XMLHttpRequest()
    // xhr.open('post', config.AI_SERVER_URL+'/api_v3/create', false)
    // xhr.setRequestHeader('Content-Type', 'application/json')
    // xhr.send(JSON.stringify({ name: data.name, url: data.url }))
    // res.send({ status: xhr.status, responseText: xhr.responseText })
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
