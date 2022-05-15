const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const StudentSchema = new Schema({
    id: { type: ObjectId },
    studentId: { type: String, match: /^S[A-Z]\d{6}$/ },
    name: { type: String },
    email: { type: String, match: /^(\w{1,})@(\w{1,}(\.)){1,}\w{1,}$/ },
    phone: { type: String, match: /^0\d{9}$/ },
    gender: { type: String, match: /^MALE$|^FEMALE$/ },

})

module.exports = mongoose.model('Student', StudentSchema)