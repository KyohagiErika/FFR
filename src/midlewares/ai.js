const axios = require('axios').default
const config = require('../config')
const fs = require("fs/promises")
const RSC = require("../lib/response-status-code")

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
            axios.post(config.AI_SERVER_URL+'/api_v3/create', {
                name: data.name,
                image: realPath
            }).then((response) => {
                console.log(response.data)
                res.status(RSC.OK).send(response.data)
            }).catch((error) => {
                console.log(error)
                res.status(RSC.INTERNAL_SERVER_ERROR).send(error)
            })
        }
    }
}

const deleteFace = async (req, res, next) => {
    const data = req.body
    axios.post(config.AI_SERVER_URL+'/api_v3/delete', {
        name: data.name
    }).then((response) => {
        console.log(response.data)
        res.status(RSC.OK).send(response.data)
    }).catch((error) => {
        console.log(error)
        res.status(RSC.INTERNAL_SERVER_ERROR).send(error)
    })
}

const scan = async (req, res, next) => {
    axios.get(config.AI_SERVER_URL+'/api_v3/scan').then((response) => {
        console.log(response.data)
        res.status(RSC.OK).send(response.data)
    }).catch((error) => {
        console.log(error)
        res.status(RSC.INTERNAL_SERVER_ERROR).send(error)
    })
}

const list = async (req, res, next) => {
    axios.get(config.AI_SERVER_URL+'/api_v3/list').then((response) => {
        console.log(response.data)
        res.status(RSC.OK).send(response.data)
    }).catch((error) => {
        console.log(error)
        res.status(RSC.INTERNAL_SERVER_ERROR).send(error)
    })
}

exports.registerFace = registerFace
exports.deleteFace = deleteFace
exports.scan = scan
exports.list = list
