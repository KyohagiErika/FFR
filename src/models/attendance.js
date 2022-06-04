const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, default: new Schema.Types.ObjectId()},
    title: {type: String},
    date: {type: Date},
    status: {type: String, enum: ['ABSENT', 'NOT YET', 'ATTENDED']}
})

exports.AttendanceSchema = AttendanceSchema
exports.Attendance = mongoose.model('Attendance', AttendanceSchema)