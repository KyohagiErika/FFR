require('dotenv').config()

exports.APPLICATION_PORT = process.env.APPLICATION_PORT || 3000
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/'
exports.DATABASE_NAME = process.env.DATABASE_NAME || 'test'
exports.MONGOOSE_URI = process.env.MONGOOSE_URI || 'mongodb://localhost:27017/test'
exports.SESSION_MAX_AGE = Number(process.env.SESSION_MAX_AGE) || 108000000
exports.COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 2592000000
exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'root'
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''
exports.ADMIN_DISPLAY_NAME = process.env.ADMIN_DISPLAY_NAME || 'Admin'
exports.DATA_LOCATION = {
    STUDENT: 'student',
    ACCOUNT: 'account',
    ATTENDANCE: 'attendance',
    location: (fileName) => __dirname+'/../data/'+fileName+'.json'
}