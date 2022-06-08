const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { AttendanceSchema } = require('./attendance')
const { FundSchema }= require('./fund')

const StudentSchema = new Schema({
    studentId: { type: String, match: /^S[A-Z]\d{6}$/, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    major: {type: String, match: /^SE$|^AI$/, required: true },
    email: { type: String, match: /^(\w{1,})@(\w{1,}(\.)){1,}\w{1,}$/, required: true, unique: true },
    phone: { type: String, match: /^0\d{9}$/, required: true, unique: true },
    gender: { type: String, match: /^MALE$|^FEMALE$/, required: true },
    birthday: {type: Date, max: '2004-31-12', min: '1990-01-01' , required: true },
    attendances: [AttendanceSchema],
    funds: [FundSchema]
})

exports.StudentSchema = StudentSchema
exports.Student = mongoose.model('Student', StudentSchema)

