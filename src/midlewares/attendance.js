const config = require('../config')
const mongoose = require('mongoose')
const Student = require('../models/student')
const RSC = require('../lib/response-status-code')
const Attendance = require('../models/attendance')

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
    if(req.query.studentId) {
        const attendance = await Attendance.find({studentId: req.query.studentId, day: req.query.day}, { _id: 0, __v: 0 }).populate('studentId', { _id: 0, __v: 0 }).catch(next)
        if(attendance) {
            resObj = attendance
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj = { message: 'Attendance of student not found!' }
        }

    } else if(req.query.day) {
        const attendance = await Attendance.find({day: req.query.day}, { _id: 0, __v: 0 }).populate('studentId', { _id: 0, __v: 0 }).catch(next)
        if(attendance) {
            resObj = attendance
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj = { message: 'Attendance in this day not found!' }
        }
    } else {
        resObj = await Attendance.find({}, { _id: 0, __v: 0 }).catch(next)
    }
    await mongoose.disconnect().catch(next)
    if(!res.headersSent) {
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
    const attendance = req.body
    let resStatus = RSC.OK
    let resObj = []
    if(attendance.studentId && attendance.day) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const student = await Student.findOne({ studentId: attendance.studentId }).catch(next)
        if(student) {
            if (await Attendance.findOne({ day: attendance.day, studentId: attendance.studentId }).catch(next)) {
                resStatus = RSC.BAD_REQUEST
                resObj.push({
                    at: 'day',
                    message: 'Already attended in this day!'
                })   
            }  
            if (resStatus === RSC.OK) {
                const realAttendance = new Attendance(attendance)
                await realAttendance.save().catch(next)
                resObj = { message: 'Attendance is successful!' }
            }
            await mongoose.disconnect().catch(next)
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'studentId',
            message: 'Empty Attendance!'
        })
    }
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
    const oldAttendance = await Attendance.findOne({ studentId: req.query.studentId, day: req.query.day }).catch(next)
    if (oldAttendance) {
        if  (attendanceInfo == oldAttendance) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'status',
                message: 'This status already existed!'
            })
        }
        if (resStatus === RSC.OK) {
            await Attendance.updateOne({ studentId: req.query.studentId, day: req.query.day }, { $set: attendanceInfo })
        resObj = { message: 'Update attendance successfully!' }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'studentId',
            message: 'Attendance not found!'
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
    if (await Attendance.findOneAndDelete({ studentId: req.query.studentId, day: req.query.day }).catch(next)) {
        resObj = { message: 'Delete attendance successfully!' }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Attendance not found!' }
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