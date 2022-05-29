const RSC = require('../lib/response-status-code')

/**
 * Allow only XmlHttpRequest
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const xhrOnly = async (req, res, next) => {
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
const guestXhrOnly = async (req, res, next) => {
    if (req.xhr && !req.session.account && !res.session.admin) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only XmlHttpRequest from Student
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const studentXhrOnly = async (req, res, next) => {
    if (req.xhr && req.session.account) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only XmlHttpRequest from Admin
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const adminXhrOnly = async (req, res, next) => {
    if (req.xhr && req.session.admin) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only XmlHttpRequest from Student and Admin
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const studentAndAdminXhrOnly = async (req, res, next) => {
    if (req.xhr && (req.session.account || req.session.admin)) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only Guest
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const guestOnly = async (req, res, next) => {
    if (!req.session.account && !req.session.admin) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only Student
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const studentOnly = async (req, res, next) => {
    if (req.session.account) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only Admin
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const adminOnly = async (req, res, next) => {
    if (req.session.admin) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

/**
 * Allow only Student and Admin
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const studentAndAdminOnly = async (req, res, next) => {
    if (req.session.account || req.session.admin) {
        next()
    } else {
        res.status(RSC.FORBIDDEN).end()
    }
}

exports.xhrOnly = xhrOnly
exports.guestXhrOnly = guestXhrOnly
exports.studentXhrOnly = studentXhrOnly
exports.studentAndAdminXhrOnly = studentAndAdminXhrOnly
exports.adminXhrOnly = adminXhrOnly
exports.guestOnly = guestOnly
exports.studentOnly = studentOnly
exports.adminOnly = adminOnly
exports.studentAndAdminOnly = studentAndAdminOnly