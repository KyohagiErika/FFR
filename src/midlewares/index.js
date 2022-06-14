const out = require('../lib/out')
const fs = require('fs')
const RSC = require('../lib/response-status-code')

/**
 * Render Home Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const renderHome = async (req, res, next) => {
    res.render('home', { account: req.session.account })
}

/**
 * Render About Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const renderAbout = async (req, res, next) => {
    res.render('about', { bannerName: 'About' })
}

/**
 * Logout
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const logout = async (req, res, next) => {
    req.session.account = null
    res.redirect('/')
}

/**
 * Render 404 Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const render404 = async (req, res, next) => {
    res.status(RSC.NOT_FOUND).send({ message: 'Not Found!' })
}

/**
 * Render 500 Page
 * @param {Error} err - Error Object
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - The next() function
 */
const render500 = async (err, req, res, next) => {
    console.log(err)
    if (req.xhr) {
        res.status(RSC.SERVER_ERROR).send(err)
    } else {
        res.status(RSC.SERVER_ERROR).send(err)
    }
}

exports.renderHome = renderHome
exports.renderAbout = renderAbout
exports.logout = logout
exports.render404 = render404
exports.render500 = render500