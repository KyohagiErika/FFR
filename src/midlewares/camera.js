const config = require('../config')
const fs = require("fs/promises")
const RSC = require('../lib/response-status-code')
const { Student } = require('../models/student')
const mongoose = require('mongoose')
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
            let realPath = req.protocol + "://" + req.headers["host"] + file.path.replace('public', '')
            axios.post(config.AI_SERVER_URL+'/api_v3', JSON.stringify({ url : realPath }), {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(async (axiosResp) => {
                if (axiosResp.status === RSC.OK) {
                    const data = axiosResp.data
                    await mongoose.connect(config.MONGOOSE_URI).catch(next)
                    const student = await Student.findOne({ studentId: data.name }).catch(next)
                    if (student) {
                        student.attendances[student.attendances.length-1].status = 'ATTENDED'
                        student.attendances[student.attendances.length-1].date = new Date(Date.now())
                        await student.save().catch(next)
                        res.send({ message: `Successfully check attendance for student ${data.name}` })
                    } else {
                        res.status(RSC.BAD_REQUEST).send({ message: 'Can\'t recognize student!' })
                    }   
                } else {
                    res.status(RSC.SERVER_ERROR).send({ message: 'Check attendance fail due to bad connection!' })
                }
                await mongoose.disconnect().catch(next)
            }).catch(next)
        }
    } else {
        res.status(RSC.BAD_REQUEST).send('Empty sent data!')
    }
}

exports.renderCameraPage = renderCameraPage
exports.recognize = recognize
