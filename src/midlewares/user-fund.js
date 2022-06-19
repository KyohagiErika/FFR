const renderFund = async (req, res, next) => {
    res.render('fund', {
        bannerName: 'Funding',
        account: req.session.account,
        fund: req.session.account.info.funds
    })
}

exports.renderFund = renderFund