const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AccountSchema = new Schema({
    username: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    info: { type: ObjectId, ref: 'Student', required: true },
    regDay: { type: Date, required: true }
})

module.exports = mongoose.model('Account', AccountSchema)