const renderAttendance = async (req, res, next) => {
    res.send(`User Attendance Info: ${req.session.account.info.attendances}`)
}

exports.renderAttendance = renderAttendance