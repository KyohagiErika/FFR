/**
 * Render Home Page
 * @param {Request} req - HTTP Request Object
 * @param {Response} res - HTTP Response Object
 */
const renderHome = (req, res) => {
    res.render('home')
}

exports.renderHome = renderHome