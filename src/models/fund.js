const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FundSchema = new Schema({
    date: {type: Date},
    period: {type: String, required: true},
    title: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, enum: ['PAID', 'NOT YET', 'PAID LATE'], default:"NOT YET" }

})
exports.FundSchema = FundSchema
exports.Fund = mongoose.model('Fund', FundSchema)