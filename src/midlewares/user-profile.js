const renderProfile = async (req, res, next) => {
    res.send(`User Profile : ${req.session.account.info.firstName} ${req.session.account.info.lastName}`)
}

exports.renderProfile = renderProfile