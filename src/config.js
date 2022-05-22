require('dotenv').config()

exports.APPLICATION_PORT = process.env.APPLICATION_PORT || 3000
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/'
exports.DATABASE_NAME = process.env.DATABASE_NAME || 'test'
exports.MONGOOSE_URI = process.env.MONGOOSE_URI || 'mongodb://localhost:27017/test'
exports.DATA_LOCATION = {
    STUDENT: 'student',
    ACCOUNT: 'account',
    location: (fileName) => __dirname+'/../data/'+fileName+'.json'
}