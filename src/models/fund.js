const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const FundSchema = new Schema({
    date: {type: Date},
    period: {type: String, required: true},
    title: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, match: /^NOT_PAID$|^PAID$|^PAID_LATE$/, default:"NOT_PAID" }

})
exports.FundSchema = FundSchema
exports.Fund = mongoose.model('Fund', FundSchema)