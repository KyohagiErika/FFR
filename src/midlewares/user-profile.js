const renderProfile = async (req, res, next) => {
    const account = req.session.account

    res.render('user-profile', {
        bannerName: 'Profile',
        account: account,
    })
}

exports.renderProfile = renderProfile