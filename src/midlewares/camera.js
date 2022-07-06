const config = require('../config')
const fs = require("fs/promises")
const RSC = require('../lib/response-status-code')
const { Student } = require('../models/student')
const FormData = require('form-data')
const axios = require('axios').default

const renderCameraPage = async (req, res, next) => {
    res.render('camera', { bannerName: 'Camera' })
}

const recognize = async (req, res, next) => {
    const file = req.file
    if (file) {
        if (file.mimetype.split('/')[0] !== 'image') {
            await fs.unlink(file.path).catch(next)
            res.status(RSC.BAD_REQUEST).send('Your uploaded file is not an image!')
        } else {
            // const data = new FormData()
            // let realPath = req.protocol + "://" + req.headers["host"] + file.path.replace('public', '')
            // realPath = realPath.replaceAll('\\', '/')
            // const realFile = await fs.readFile(file.path)
            // const fileName = file.path.split('/').pop()
            // data.append('img', realFile, fileName)

            // axios.post(config.AI_SERVER_URL+'/api_v3', data, {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).then((axiosResp) => {
            //     res.send('Success!')
            //     // res.send(axiosResp)
            // }).catch(next)
            
            let realPath = req.protocol + "://" + req.headers["host"] + file.path.replace('public', '')
            realPath = realPath.replaceAll('\\', '/')
            console.log(realPath)
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const xhrRes = JSON.parse(xhr.responseText)
                    if (xhrRes.name === 0) {
                        res.status(RSC.BAD_REQUEST).send('Can\'t recognize!')
                    } else {
                        res.send(xhrRes.name)
                    }
                } else {
                    res.status(RSC.BAD_REQUEST).send('AI Server error with message: '+xhr.responseText)
                }
                // await fs.unlink(file.path).catch(next)
            }

            xhr.open('post', config.AI_SERVER_URL+'/api_v1')
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({ url: realPath }))
            
        }
    } else {
        res.status(RSC.BAD_REQUEST).send('Empty sent data!')
    }
}

const recognize_v2 = async (req, res, next) => {
    const studentId = req.body.name
    if (studentId) {
        const student = await Student.findById(studentId).populate('attendance').catch(next)
        if (student) {
            
        } else {
            res.status(RSC.BAD_REQUEST).send('Student not found!')
        }
    } else {
        res.status(RSC.BAD_REQUEST).send('Empty send data!')
    }
}

exports.renderCameraPage = renderCameraPage
exports.recognize = recognize
