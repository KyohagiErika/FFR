const config = require('../config')
const mongoose = require('mongoose')
const { Admin } = require('../models/admin')
const RSC = require('../lib/response-status-code')

/**
 * Render Dashboard page
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const renderDashboard = async (req, res, next) => {
    res.send('Dashboard page')
}

/**
 * Render Login page
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const renderLogin = async (req, res, next) => {
    res.render('admin-login', { bannerName: 'Admin Login' })
}

/**
 * Login
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const login = async (req, res, next) => {
    let resStatus = RSC.OK
    let resObj = null
    const signature = req.body
    if (signature.username && signature.pass) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const admin = await Admin.findOne(signature, { _id: 0, __v: 0 }).catch(next)
        await mongoose.disconnect().catch(next)
        if (admin) {
            req.session.admin = admin
            res.redirect('/admin/dashboard')
        } else if (!res.headersSent) {
            resStatus = RSC.BAD_REQUEST
            resObj = { message: 'Wrong username or password!' }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Empty username or password!' }
    }
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Logout
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const logout = async (req, res, next) => {
    req.session.admin = null
    res.redirect('/admin')
}

exports.renderDashboard = renderDashboard
exports.renderLogin = renderLogin
exports.login = login
exports.logout = logout