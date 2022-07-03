const config = require('../config')
const mongoose = require('mongoose')
const { Admin } = require('../models/admin')
const RSC = require('../lib/response-status-code')
const {Student} = require("../models/student")

/**
 * Render Dashboard page
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const renderDashboard = async (req, res, next) => {
    res.render('dashboard', { layout: 'admin', bannerName: 'Admin' })
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

const renderRegisterFace = async (req, res, next) => {
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const studentList = await Student.find().catch(next)
    await mongoose.disconnect().catch(next)
    const realList = []
    studentList.forEach(student => {
        realList.push({ name: student.firstName + ' ' + student.lastName, studentId: student.studentId })
    })
    res.render('face-register', { layout: 'temp', student: realList })
}

exports.renderDashboard = renderDashboard
exports.renderLogin = renderLogin
exports.login = login
exports.logout = logout
exports.renderRegisterFace = renderRegisterFace