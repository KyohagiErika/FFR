const renderProfile = async (req, res, next) => {
    res.render('user-profile', { bannerName: 'Profile' })
}

exports.renderProfile = renderProfile