const config = require('../config')
const multer = require('multer')
const fs = require('fs')
const fsSync = require('fs/promises')
const RSC = require('../lib/response-status-code')
const imageStorage = multer.diskStorage({
    destination: async (req, file, callback) => {
        if (!fs.existsSync(__dirname+'/../../'+config.IMAGE_PATH)) {
            fs.mkdirSync(__dirname+'/../../'+config.IMAGE_PATH, { recursive: true })
        }
        callback(null, config.IMAGE_PATH)
    },
    filename: (req, file, callback) => {
        const fileInfo = file.mimetype.split('/')
        const fileName = `${fileInfo[0]}-${file.fieldname}-${Date.now()}.${fileInfo[1]}`
        callback(null, fileName)
    }
})
const uploadImage = multer({ storage: imageStorage })

exports.uploadImage = uploadImage