const config = require('../config')
const mongoose = require('mongoose')
const Student = require('../models/student')
const RSC = require('../lib/response-status-code')
const {Attendance} = require('../models/attendance')
const {Student} = require('../models/student')
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
    if(req.session.account.studentId && req.query.attendanceId) {
        const attendance = await Attendance.findById(req.query.attendanceId)
        if(attendance) {
            const student = await Student.find({studentId: req.session.account.studentId, 'attendances._id': req.query.attendanceId}, { _id: 0, __v: 0 }).catch(next)
            if(student) {
                resObj = student
            } else {
                resStatus = RSC.BAD_REQUEST
                resObj = { message: 'Attendance of you not found!' }
            }
        } else {
            resStatus = RSC.BAD_REQUEST
                resObj = { message: 'Attendance not found!' }
        }
    } else if(req.session.account.studentId) {
        const student = await Student.find({studentId: req.session.account.studentId}, { _id: 0, __v: 0 }).catch(next)
        if(student) {
            resObj = student
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj = { message: 'Student attendance not found!' }
        }
    } else if(req.session.admin && req.query.attendanceId) {
            const attendance = await Attendance.findById(req.query.attendanceId) 
            if (attendance) {
                const student = await Student.find({'attendance._id': req.query.attendanceId}, { _id: 0, __v: 0 }).catch(next)
                if(student) {
                    resObj = attendance
                } else {
                    resStatus = RSC.BAD_REQUEST
                    resObj = { message: 'Student attendance not found!' }
                }
            } else {
                resStatus = RSC.BAD_REQUEST
                resObj = { message: 'Attendance not found!' }
            }   
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Attendance not found!' }
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
    if(attendance.title) {
        await mongoose.connect(config.MONGOOSE_URI).catch(next)
        const attendance = await Attendance.findOne({ title: attendance.title }).catch(next)
        if(attendance) {
                resStatus = RSC.BAD_REQUEST
                resObj.push({
                    at: 'title',
                    message: 'Attendance title already existed!'
                })   
        }
        if (resStatus === RSC.OK) {
            const realAttendance = new Attendance(attendance)
            await realAttendance.save().catch(next)
            await Student.updateMany({}, {
                $addToSet: {
                    attendances: realAttendance
                }
            })
            resObj = { message: 'Add attendance successfully!' }
        }
        await mongoose.disconnect().catch(next)
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'title',
            message: 'Empty attendance title!'
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
    if(attendanceInfo.title && !attendanceInfo.status) {
        const oldAttendance = await Attendance.findById(req.query.attendanceId).catch(next)
        if (oldAttendance) {
            const titleAttendance = await Attendance.findOne({title: attendanceInfo.title}).catch(next)
            if  (titleAttendance || titleAttendance !== oldAttendance) {
                resStatus = RSC.BAD_REQUEST
                resObj.push({
                    at: 'title',
                    message: 'This attendance title already existed!'
                })
            }
            if (resStatus === RSC.OK) {
                await Attendance.updateOne({ _id: req.query.attendanceId}, { $set: {title: attendanceInfo.title} })
                await Student.updateMany({'attendances._id': req.query.attendanceId}, {
                    $set: {
                        'attendances.$.title' : attendanceInfo.title
                    }
                })
                resObj.push({ 
                    message: 'Update attendance title successfully!' 
                })
            }
        } else {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: '_id',
                message: 'Attendance ID not found!'
            })
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'title',
            message: 'New attendance title not found!'
        })
    }

     if(attendanceInfo.status.match(/^ATTENDED$|^ABSENT$/)) {
        const oldStudent = await Student.findOne({studentId: req.query.studentId, 'attendances._id': req.query.attendanceId})
        if(oldStudent.attendances.status == attendanceInfo.status) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'status',
                message: 'Attendance status already existed!'
            })
        } else {
            
            if (resStatus === RSC.OK) {
                await Student.updateMany({studentId: req.query.studentId, 'attendances._id': req.query.attendanceId}, {
                    $set: {
                        'attendances.$.status' : attendanceInfo.status
                    }
                }).catch(next)
                resObj = { message: 'Update student successfully!' }
            }
        }

    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'status',
            message: 'Attendance status not found!'
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
    if (await Attendance.findOneAndDelete({ title: req.query.attendanceId}).catch(next)) {
        if(await Student.deleteMany({'attendances.title': req.query.attendanceId})) {
            resObj = { message: 'Delete attendance successfully!' }
        } else {
            resObj = { message: 'Student list of attendance title not found!' }
        }      
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = { message: 'Attendance title not found!' }
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