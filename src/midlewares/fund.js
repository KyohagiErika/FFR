const config = require('../config')
const mongoose = require('mongoose')

const { Fund } = require('../models/fund')

const RSC = require('../lib/response-status-code')
/**
 * Get Fund API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const getFund = async (req, res, next) => {
    let resStatus = RSC.OK
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    let resObj = null
    if (req.query.date) {
        resObj = await Fund.findOne({ date: req.query.date }, { _id: 0, __v: 0 }).catch(next)
        if (!resObj) {
            resStatus = RSC.BAD_REQUEST
            resObj = {
                at: 'date',
                message: 'Date not found!'
            }
        }
    } else {
        resObj = await Fund.find({}, { _id: 0, __v: 0 }).catch(next)
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Post Fund API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const postFund = async (req, res, next) => {
    const fund = req.body
    let resStatus = RSC.OK
    let resObj = []
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    if (await Fund.findOne({ title:fund.title}).catch(next)) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'title',
            message: 'Fund already existed!'
        })

    }

    if (await Fund.findOne({period:fund.period }).catch(next)) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'period',
            message: 'Fund already existed!'
        })

    }

    if (await Fund.findOne({amount:fund.amount }).catch(next)) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'amount',
            message: 'Fund already existed!'
        })

    }

    if (resStatus === RSC.OK) {
        const realFund = new Fund(fund)
        await realFund.save().catch(next)
        await Student.updateMany({ studentId: req.query.studentId }, { $addToSet: realFund }).catch(next)
        resObj = { message: 'Create fund successfully!' }
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Put Fund API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const putFund = async (req, res, next) => {
    const fundInfo = req.body
    let resStatus = RSC.OK
    let resObj = []
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const oldFund = await Fund.findOne({ period: req.query.period }).catch(next)
    if (oldFund) {
        const periodFund = await Fund.findOne({ period: fundInfo.period }).catch(next)
        if (fundInfo.period && periodFund && periodFund !== oldFund) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'period',
                message: 'period already existed!'
            })
        }
        const titleFund = await Fund.findOne({ title: fundInfo.title }).catch(next)
        if (fundInfo.title && titleFund && titleFund !== oldFund) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'title',
                message: 'title already existed!'
            })
        }
        const amountFund = await Fund.findOne({ amount: fundInfo.amount }).catch(next)
        if (fundInfo.amount && amountFund && amountFund !== oldFund) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'amount',
                message: 'amount already existed!'
            })
        }
        if (resStatus === RSC.OK) {
            await Fund.updateOne({ period: req.query.period }, { $set: fundInfo }).catch(next)
            await Student.updateMany({ studentId: req.query.studentId }, { $set: fundInfo }).catch(next)
            resObj = { message: 'Update fund successfully!' }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'period',
            message: 'fund not found!'
        })
    }
    await mongoose.disconnect().catch(next)
    res.status(resStatus).send(resObj)
}

/**
 * Delete Fund API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const deleteFund = async (req, res, next) => {
    let resStatus = RSC.OK
    let resObj = null
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    if (await Fund.findOneAndDelete({ title: req.query.title }).catch(next)) {
        resObj = { message: 'Delete fund successfully!' }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = {
            at: 'title',
            message: 'Fund not found!'
        }
    }
    await mongoose.disconnect().catch(next)
    res.status(resStatus).send(resObj)
}

exports.getFund = getFund
exports.postFund = postFund
exports.putFund = putFund
exports.deleteFund = deleteFund