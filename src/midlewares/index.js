const out = require('../lib/out')

/**
 * Render Home Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 */
const renderHome = (req, res) => {
    res.render('home')
}

/**
 * Render 404 Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - next() function
 */
const render404 = (req, res, next) => {
    res.status(404).end()
}

/**
 * Render 500 Page
 * @param {Error} err - Error Object
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 * @param {Function} next - next() function
 */
const render500 = (err, req, res, next) => {
    out.log(out.danger(err))
    res.status(500).end()
}

exports.renderHome = renderHome
exports.render404 = render404
exports.render500 = render500