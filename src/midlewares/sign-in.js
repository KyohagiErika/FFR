const config = require('../config')
const mongoose = require('mongoose')
const Account = require('../models/account')
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
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const account = await Account.findOne(signature, { _id: 0, __v: 0 }).populate('info', { _id: 0, __v: 0 }).catch(next)
    await mongoose.disconnect().catch(next)
    if (account) {
        req.session.account = account
        res.redirect('/')
    } else if (!res.headersSent) {
        res.status(RSC.BAD_REQUEST).render('sign-in', { message: 'Wrong username or password!' })
    }
}

exports.renderSignIn = renderSignIn
exports.signIn = signIn