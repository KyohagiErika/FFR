const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    displayName: { type: String, default: 'Admin' }
})

exports.AdminSchemaSchema = AdminSchema
exports.Admin = mongoose.model('Admin', AdminSchema)
