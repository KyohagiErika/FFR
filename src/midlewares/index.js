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
    res.render('about', { bannerName: 'About', account: req.session.account })
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
    res.status(RSC.NOT_FOUND).render('error', {
        layout: 'error',
        message: 'The page which you\'re looking for is not found!',
        code: RSC.NOT_FOUND,
        status: 'NOT FOUND'
    })
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
        res.status(RSC.SERVER_ERROR).send({ message: 'There are some errors occured!' })
    } else {
        res.status(RSC.SERVER_ERROR).render('error', {
            layout: 'error',
            code: RSC.SERVER_ERROR,
            status: 'SERVER ERROR',
            message: 'There are some errors occured!'
        })
    }
}

exports.renderHome = renderHome
exports.renderAbout = renderAbout
exports.logout = logout
exports.render404 = render404
exports.render500 = render500