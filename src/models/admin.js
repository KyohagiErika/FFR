const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    displayName: { type: String, default: 'Admin' }
})
const Admin = mongoose.model('Admin', AdminSchema)

exports.AdminSchemaSchema = AdminSchema
exports.Admin = Admin
