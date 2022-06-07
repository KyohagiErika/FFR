const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FundSchema = new Schema({
    date: {type: Date},
    period: {type: String},
    title: {type: String, required: true},
    amount: {type: Number},
    status: {type: String, enum: ['PAID', 'NOT YET', 'PAID LATE'] }

})
exports.FundSchema = FundSchema
exports.Fund = mongoose.model('Fund', FundSchema)