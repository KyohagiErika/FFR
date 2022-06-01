const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const {FundSchema}= require('./fund')
const StudentSchema = new Schema({
    studentId: { type: String, match: /^S[A-Z]\d{6}$/, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, match: /^(\w{1,})@(\w{1,}(\.)){1,}\w{1,}$/, required: true, unique: true },
    phone: { type: String, match: /^0\d{9}$/, required: true, unique: true },
    gender: { type: String, match: /^MALE$|^FEMALE$/, required: true },
    funds: [FundSchema]

})

exports.StudentSchema = StudentSchema
exports.Student = mongoose.model('Student', StudentSchema )