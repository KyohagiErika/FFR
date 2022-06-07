const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    title: {type: String, required: true, unique: true},
    date: {type: Date},
    status: {type: String, enum: ['ABSENT', 'NOT YET', 'ATTENDED']}
})

exports.AttendanceSchema = AttendanceSchema
exports.Attendance = mongoose.model('Attendance', AttendanceSchema)