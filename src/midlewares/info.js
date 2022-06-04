const config = require('../config')
const mongoose = require('mongoose')
const { Account } = require('../models/account')
const { Student } = require('../models/student')
const RSC = require('../lib/response-status-code')

/**
 * Render Information Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const renderInfo = async (req, res, next) => {
    res.send(req.session.account)
}

/**
 * Edit Information
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const editInfo = async (req, res, next) => {
    const account = req.session.account
    const updatingInfo = req.body
    await Student.updateOne({ studentId: account.info.studentId }, {
        $set: updatingInfo
    }).catch(next)
    if (!res.headersSent) {
        res.send({ message: "Update info successfully!" })
    }
}

exports.rederInfo = renderInfo
exports.editInfo = editInfo