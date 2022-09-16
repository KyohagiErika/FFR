const config = require('../config')
const mongoose = require('mongoose')
const { Student } = require('../models/student')
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
    if (req.query.fundId) {
        resObj = await Fund.findOne({ _id: req.query.fundId }, { __v: 0 }).catch(next)
        if (!resObj) {
            resStatus = RSC.BAD_REQUEST
            resObj = {
                at: '_id',
                message: 'Fund not found!'
            }
        }
    } else {
        resObj = await Fund.find({}, { __v: 0 }).catch(next)
    }
    //await mongoose.disconnect().catch(next)
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
    const fundInfo = req.body
    let resStatus = RSC.OK
    let resObj = []
    if (fundInfo.title) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const fund = await Fund.findOne({ title: fundInfo.title }).catch(next)
        if (fund) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'title',
                message: 'Fund title already existed!'
            })
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'title',
            message: 'Empty fund title!'
        })
    }
    if (fundInfo.period == null) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'period',
            message: 'Empty fund period!'
        })
    }
    if (resStatus === RSC.OK) {
        const realFund = new Fund(fundInfo)
        await realFund.save().catch(next)
        realFund.status = 'NOT YET'
        await Student.updateMany({}, {
            $addToSet: {
                funds: realFund
            }
        })
        resObj = { message: 'Add fund successfully!' }
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
    const oldFund = await Fund.findById({ _id: req.query.fundId }).catch(next)
    if (oldFund) {
        if (fundInfo.title) {
            const titleFund = await Fund.findOne({ title: fundInfo.title }).catch(next)
            if (titleFund && fundInfo.title !== oldFund.title) {
                resStatus = RSC.BAD_REQUEST
                resObj.push({
                    at: 'title',
                    message: 'Fund title already existed!'
                })
            }
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'title',
                message: 'Fund title not found!'
            })
        }
        if (fundInfo.period == null) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'period',
                message: 'Fund period not found!'
            })
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: '_id',
            message: 'Fund ID not found!'
        })
    }
    if (resStatus === RSC.OK) {
        await Fund.updateOne({ _id: req.query.fundId }, { $set: { title: fundInfo.title, period: fundInfo.period } })
        await Student.updateMany({ 'funds._id': req.query.fundId }, {
            $set: {
                'funds.$.title': fundInfo.title,
                'funds.$.period': fundInfo.period
            }
        })
        resObj.push({
            message: 'Update fund successfully!'
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
    const fund = await Fund.findOneAndDelete({ _id: req.query.fundId }).catch(next)
    if (fund) {
        if (await Student.updateMany({}, {
            $pull: {
                funds: {
                    title: fund.title
                }
            }
        })) {
            resObj = { message: 'Delete fund successfully!' }
        } else {
            resObj = { message: 'Student list of fund not found!' }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Fund ID not found!' }
    }
    await mongoose.disconnect().catch(next)
    res.status(resStatus).send(resObj)
}

exports.getFund = getFund
exports.postFund = postFund
exports.putFund = putFund
exports.deleteFund = deleteFund