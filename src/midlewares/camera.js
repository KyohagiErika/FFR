const config = require('../config')
const fs = require("fs/promises")
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const renderCameraPage = async (req, res, next) => {
    res.render('camera', {bannerName: 'Camera'})
}

const recognize = async (req, res, next) => {
    const file = req.file
    if (file) {
        if (file.mimetype.split('/')[0] !== 'image') {
            await fs.unlink(file.path)
            if (req.xhr) {

            } else {

            }
        } else {
            const realPath = file.path.replace('public', '')
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                if (req.xhr) {

                } else {

                }
            }
            xhr.open('post', config.AI_SERVER_URL+'/api_v3')
            xhr.setRequestHeader('Content-Type', 'text/json')
            xhr.send(JSON.stringify({ url: realPath }))
        }
    } else {
        if (req.xhr) {
            res.status(400).send('Empty sent data!')
        } else {
            res.render('camera', { bannerName: 'camera', message: 'Empty sent data!' })
        }
    }
}

exports.renderCameraPage = renderCameraPage
