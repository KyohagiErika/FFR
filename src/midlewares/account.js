const config = require('../config')
const mongoose = require('mongoose')
const { Account } = require('../models/account')
const { Student } = require('../models/student')
const RSC = require('../lib/response-status-code')

/**
 * Get Account API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const getAccount = async (req, res, next) => {
    let resStatus = RSC.OK
    let resObj = null
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    if (req.query.username) {
        const account = await Account.findOne({ username: req.query.username }, { _id: 0, __v: 0 }).populate('info', { _id: 0, __v: 0 }).catch(next)
        if (account) {
            resObj = account
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj = { message: 'Account not found!' }
        }
    } else {
        resObj = await Account.find({}, { _id: 0, __v: 0 })
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Post Account API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const postAccount = async (req, res, next) => {
    const account = req.body
    let resStatus = RSC.OK
    let resObj = null
    if (account.pass) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const student = await Student.findOne({ studentId: account.studentId }).catch(next)
        if (student) {
            if (await Account.findOne({ username: account.username }).catch(next)) {
                resStatus = RSC.BAD_REQUEST
                resObj = {
                    at: 'username',
                    message: 'Account already existed!'
                }
            } else if (await Account.findOne({ info: student._id }).catch(next)) {
                resStatus = RSC.BAD_REQUEST
                resObj = {
                    at: 'studentId',
                    message: 'Account already existed on this student!'
                }
            } else {
                account.regDay = Date.now()
                account.info = student._id
                account.studentId = null
                const realAccount = new Account(account)
                await realAccount.save().catch(next)
                resObj = { message: 'Create account successfully!' }
            }
            await mongoose.disconnect().catch(next)
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj = {
                at: 'studentId',
                message: 'Student not found!'
            }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = {
            at: 'pass',
            message: 'Empty password!'
        }
    }
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Put Account API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const putAccount = async (req, res, next) => {
    const accountInfo = req.body
    let resStatus = RSC.OK
    let resObj = []
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const oldAccount = await Account.findOne({ username: req.query.username }).catch(next)
    if (oldAccount) {
        await Account.updateOne({ username: req.query.username }, { $set: accountInfo })
        resObj = { message: 'Update account successfully!' }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'username',
            message: 'Account not found!'
        })
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Delete Account API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const deleteAccount = async (req, res, next) => {
    let resStatus = RSC.OK
    let resObj = null
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    if (await Account.findOneAndDelete({ username: req.query.username }).catch(next)) {
        resObj = { message: 'Delete account successfully!' }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Account not found!' }
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

exports.getAccount = getAccount
exports.postAccount = postAccount
exports.putAccount = putAccount
exports.deleteAccount = deleteAccount