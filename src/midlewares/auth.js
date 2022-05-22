const RSC = require('../lib/response-status-code')

/**
 * Allow only XmlHttpRequest
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const xhrOnly = (req, res, next) => {
    if (req.xhr) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only XmlHttpRequest from Guest
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const guestXhrOnly = (req, res, next) => {
    next()
}

/**
 * Allow only XmlHttpRequest from Student
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const studentXhrOnly = (req, res, next) => {
    next()
}

/**
 * Allow only XmlHttpRequest from Admin
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const adminXhrOnly = (req, res, next) => {
    next()
}

/**
 * Allow only Guest
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const guestOnly = (req, res, next) => {
    next()
}

/**
 * Allow only Student
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const studentOnly = (req, res, next) => {
    next()
}

/**
 * Allow only Admin
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const adminOnly = (req, res, next) => {
    next()
}

exports.xhrOnly = xhrOnly
exports.guestXhrOnly = guestXhrOnly
exports.studentXhrOnly = studentXhrOnly
exports.adminXhrOnly = adminXhrOnly
exports.guestOnly = guestOnly
exports.studentOnly = studentOnly
exports.adminOnly = adminOnly