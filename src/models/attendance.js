const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AttendanceSchema = new Schema({
    day: {type: Date, require: true},
    status: {type: String, enum: ['Absent', 'Not yet', 'Attended'], require: true, default: 'Not yet'},
    studentId: { type: ObjectId, ref: 'Student', required: true },
    title: {type: String, default: 'Club Meeting'}
})

module.exports = mongoose.model('Attendance', AttendanceSchema)