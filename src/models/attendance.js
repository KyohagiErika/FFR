const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    title: {type: String, require: true, unique: true},
    date: {type: Date},
    status: {type: String, enum: ['ABSENT', 'NOT YET', 'ATTENDED'], default: 'NOT YET'} 
})

exports.AttendanceSchema = AttendanceSchema
exports.Attendance = mongoose.model('Attendance', AttendanceSchema)