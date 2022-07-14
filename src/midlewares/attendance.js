const config = require('../config')
const mongoose = require('mongoose')
const { Student } = require('../models/student')
const { Attendance } = require('../models/attendance')
const RSC = require('../lib/response-status-code')
/**
 * Get Attendance API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const getAttendance = async (req, res, next) => {
    let resStatus = RSC.OK
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    let resObj = null
    if (req.query.attendanceId) {
        resObj = await Attendance.findOne({ _id: req.query.attendanceId }, { _id: 0, __v: 0 }).catch(next)
        if (!resObj) {
            resStatus = RSC.BAD_REQUEST
            resObj = {
                at: '_id',
                message: 'Attendance not found!'
            }
        }
    } else {
        resObj = await Attendance.find().catch(next)
    }
    //await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
* Post Attendance API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const postAttendance = async (req, res, next) => {
    const attendanceInfo = req.body
    let resStatus = RSC.OK
    let resObj = []
    if (attendanceInfo.title) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const attendance = await Attendance.findOne({ title: attendanceInfo.title }).catch(next)
        if (attendance) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'title',
                message: 'Attendance title already existed!'
            })
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'title',
            message: 'Empty attendance title!'
        })
    }
    if (attendanceInfo.date) {
        const attendance = await Attendance.findOne({ date: attendanceInfo.date }).catch(next)
        if (attendance) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'date',
                message: 'Attendance date already existed!'
            })
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'date',
            message: 'Empty attendance date!'
        })
    }
    if (resStatus === RSC.OK) {
        const realAttendance = new Attendance(attendanceInfo)
        await realAttendance.save().catch(next)
        realAttendance.status = 'NOT YET'
        await Student.updateMany({}, {
            $addToSet: {
                attendances: realAttendance
            }
        })
        resObj = { message: 'Add attendance successfully!' }
    }
    await mongoose.disconnect().catch(next)

    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Put Attendance API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const putAttendance = async (req, res, next) => {
    const attendanceInfo = req.body
    let resStatus = RSC.OK
    let resObj = []
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const oldAttendance = await Attendance.findById(req.query.attendanceId).catch(next)
    if (oldAttendance) {
        if (attendanceInfo.title) {
            const titleAttendance = await Attendance.findOne({ title: attendanceInfo.title }).catch(next)
            if (titleAttendance && attendanceInfo.title !== oldAttendance.title) {
                resStatus = RSC.BAD_REQUEST
                resObj.push({
                    at: 'title',
                    message: 'Attendance title already existed!'
                })
            }
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'title',
                message: 'Attendance title not found!'
            })
        }
        if (attendanceInfo.date) {
            const dateAttendance = await Attendance.findOne({ date: attendanceInfo.date }).catch(next)
            if (dateAttendance && attendanceInfo.date !== oldAttendance.date) {
                resStatus = RSC.BAD_REQUEST
                resObj.push({
                    at: 'date',
                    message: 'Attendance date already existed!'
                })
            }
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'date',
                message: 'Attendance date not found!'
            })
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: '_id',
            message: 'Attendance ID not found!'
        })
    }

    if (resStatus === RSC.OK) {
        await Attendance.updateOne({ _id: req.query.attendanceId }, { $set: { title: attendanceInfo.title, date: attendanceInfo.date } })
        await Student.updateMany({ 'attendances._id': req.query.attendanceId }, {
            $set: {
                'attendances.$.title': attendanceInfo.title,
                'attendances.$.date': attendanceInfo.date
            }
        })
        resObj.push({
            message: 'Update attendance successfully!'
        })
    }
    await mongoose.disconnect().catch(next)
    res.status(resStatus).send(resObj)
}

/**
 * Delete Attendance API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function 
 */
const deleteAttendance = async (req, res, next) => {
    let resStatus = RSC.OK
    let resObj = null
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const attendance = await Attendance.findOneAndDelete({ _id: req.query.attendanceId }).catch(next)
    if (attendance) {
        if (await Student.updateMany({}, {
            $pull: {
                attendances: {
                    title: attendance.title
                }
            }
        })) {
            resObj = { message: 'Delete attendance successfully!' }
        } else {
            resObj = { message: 'Student list of attendance not found!' }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Attendance ID not found!' }
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

exports.getAttendance = getAttendance
exports.postAttendance = postAttendance
exports.putAttendance = putAttendance
exports.deleteAttendance = deleteAttendance