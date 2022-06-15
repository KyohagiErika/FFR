const renderFund = async (req, res, next) => {
    res.send(`User Fund Info : ${req.session.account.info.funds}`)
}

exports.renderFund = renderFund