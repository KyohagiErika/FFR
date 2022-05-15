require('dotenv').config()

exports.APPLICATION_PORT = process.env.PORT || 3000
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
exports.DATABASE_NAME = process.env.DATABASE_NAME || 'test'