const out = require('../lib/out')
const RSC = require('../lib/response-status-code')

/**
 * Render Home Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 */
const renderHome = (req, res) => {
    res.render('home')
}

/**
 * Render About Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 */
const renderAbout = (req, res) => {
    res.render('about', { bannerName: 'About' })
}

/**
 * Render SignIn Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 */
const renderSignIn = (req, res) => {
    res.render('sign-in', { bannerName: 'Sign In' })
}

/**
 * Render 404 Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - next() function
 */
const render404 = (req, res, next) => {
    res.status(RSC.NOT_FOUND).send({ message: 'Not Found!' })
}

/**
 * Render 500 Page
 * @param {Error} err - Error Object
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - next() function
 */
const render500 = (err, req, res, next) => {
    console.log(err)
    if (req.xhr) {
        res.status(RSC.SERVER_ERROR).send(err)
    } else {
        res.status(RSC.SERVER_ERROR).send(err)
    }
}

exports.renderHome = renderHome
exports.renderAbout = renderAbout
exports.renderSignIn = renderSignIn
exports.render404 = render404
exports.render500 = render500