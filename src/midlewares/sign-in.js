const config = require('../config')
const mongoose = require('mongoose')
const { Account } = require('../models/account')
const RSC = require('../lib/response-status-code')

/**
 * Render SignIn Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const renderSignIn = async (req, res, next) => {
    res.render('sign-in', { bannerName: 'Sign In' })
}

/**
 * Login processing
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const signIn = async (req, res, next) => {
    const signature = req.body
    if (signature.username && signature.pass) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const account = await Account.findOne({ username: signature.username, pass: signature.pass }, { _id: 0, __v: 0, pass: 0 }).populate('info', { _id: 0, __v: 0 }).catch(next)
        await mongoose.disconnect().catch(next)
        if (account) {
            req.session.account = account
            res.redirect('/user/profile')
        }
    }
    if (!res.headersSent) {
        res.render('sign-in', { bannerName: 'Sign In', errMsg: 'Wrong username or password!' })

    }
}

exports.renderSignIn = renderSignIn
exports.signIn = signIn