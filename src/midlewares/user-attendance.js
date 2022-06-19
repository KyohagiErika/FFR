const renderAttendance = async (req, res, next) => {
    res.render('attendance', {
        bannerName: 'Attendance',
        account: req.session.account,
        attendance: req.session.account.info.attendances
    })
}

exports.renderAttendance = renderAttendance