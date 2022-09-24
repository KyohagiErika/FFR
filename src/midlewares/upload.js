const config = require('../config')
const multer = require('multer')
const fs = require('fs')
const fsSync = require('fs/promises')
const RSC = require('../lib/response-status-code')
const path = require('path')
const imageStorage = multer.diskStorage({
    destination: async (req, file, callback) => {
        const dir = path.resolve(__dirname+'/../../'+config.IMAGE_PATH)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        callback(null, dir)
    },
    filename: (req, file, callback) => {
        const fileInfo = file.mimetype.split('/')
        const fileName = `${fileInfo[0]}-${file.fieldname}-${Date.now()}.${fileInfo[1]}`
        callback(null, fileName)
    }
})
const uploadImage = multer({ storage: imageStorage })

exports.uploadImage = uploadImage