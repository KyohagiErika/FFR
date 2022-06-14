const config = require('../config')
const mongoose = require('mongoose')
const { Student } = require('../models/student')
const RSC = require('../lib/response-status-code')

/**
 * Get Student API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const getStudent = async (req, res, next) => {
    let resStatus = RSC.OK
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    let resObj = null
    if (req.query.studentId) {
        resObj = await Student.findOne({ studentId: req.query.studentId }, { _id: 0, __v: 0 }).catch(next)
        if (!resObj) {
            resStatus = RSC.BAD_REQUEST
            resObj = {
                at: 'studentId',
                message: 'Student not found!'
            }
        }
    } else {
        resObj = await Student.find({}, { _id: 0, __v: 0 }).catch(next)
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Post Student API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const postStudent = async (req, res, next) => {
    const student = req.body
    let resStatus = RSC.OK
    let resObj = []
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    if (await Student.findOne({ studentId: student.studentId }).catch(next)) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'studentId',
            message: 'Student already existed!'
        })
    }
    // if (await Student.findOne({ firstName: student.firstName }).catch(next)) {
    //     resStatus = RSC.BAD_REQUEST
    //     resObj.push({
    //         at: 'firstName',
    //         message: 'First Name already existed!'
    //     })
    // }
    // if (await Student.findOne({ lastName: student.lastName }).catch(next)) {
    //     resStatus = RSC.BAD_REQUEST
    //     resObj.push({
    //         at: 'lastName',
    //         message: 'Last Name already existed!'
    //     })
    // }
    // if (await Student.findOne({ major: student.major }).catch(next)) {
    //     resStatus = RSC.BAD_REQUEST
    //     resObj.push({
    //         at: 'major',
    //         message: 'Major already existed!'
    //     })
    // }
    if (await Student.findOne({ email: student.email }).catch(next)) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'email',
            message: 'Email already existed!'
        })
    }
    if (await Student.findOne({ phone: student.phone }).catch(next)) {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'phone',
            message: 'Phone number already existed!'
        })
    }
    // if (await Student.findOne({ gender: student.gender }).catch(next)) {
    //     resStatus = RSC.BAD_REQUEST
    //     resObj.push({
    //         at: 'gender',
    //         message: 'Gender already existed!'
    //     })
    // }
    // if (await Student.findOne({ birthday: student.birthday }).catch(next)) {
    //     resStatus = RSC.BAD_REQUEST
    //     resObj.push({
    //         at: 'birthday',
    //         message: 'Birthday already existed!'
    //     })
    // }
    if (resStatus === RSC.OK) {
        const realStudent = new Student(student)
        await realStudent.save().catch(next)
        resObj = { message: 'Create student successfully!' }
    }
    await mongoose.disconnect().catch(next)
    if (!res.headersSent) {
        res.status(resStatus).send(resObj)
    }
}

/**
 * Put Student API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const putStudent = async (req, res, next) => {
    const studentInfo = req.body
    let resStatus = RSC.OK
    let resObj = []
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    const oldStudent = await Student.findOne({ studentId: req.query.studentId }).catch(next)
    if (oldStudent) {
        const studentFirstName = await Student.findOne({ firstName: studentInfo.firstName }).catch(next)
        if (studentInfo.firstName && studentFirstName && studentFirstName !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'firstName',
                message: 'First Name already existed!'
            })
        }
        const studentLastName = await Student.findOne({ lastName: studentInfo.lastName }).catch(next)
        if (studentInfo.lastName && studentLastName && studentLastName !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'lastName',
                message: 'Last Name already existed!'
            })
        }
        const majorStudent = await Student.findOne({ major: studentInfo.major }).catch(next)
        if (studentInfo.major && majorStudent && majorStudent !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'major',
                message: 'Major already existed!'
            })
        }
        const emailStudent = await Student.findOne({ email: studentInfo.email }).catch(next)
        if (studentInfo.email && emailStudent && emailStudent !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'email',
                message: 'Email already existed!'
            })
        }
        const phoneStudent = await Student.findOne({ phone: studentInfo.phone }).catch(next)
        if (studentInfo.phone && phoneStudent && phoneStudent !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'phone',
                message: 'Phone number already existed!'
            })
        }
        const genderStudent = await Student.findOne({ gender: studentInfo.gender }).catch(next)
        if (studentInfo.gender && genderStudent && genderStudent !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'gender',
                message: 'Gender already existed!'
            })
        }
        const birthdayStudent = await Student.findOne({ birthday: studentInfo.birthday }).catch(next)
        if (studentInfo.birthday && birthdayStudent && birthdayStudent !== oldStudent) {
            resStatus = RSC.BAD_REQUEST
            resObj.push({
                at: 'birthday',
                message: 'Birthday already existed!'
            })
        }
        if (resStatus === RSC.OK) {
            await Student.updateOne({ studentId: req.query.studentId }, { $set: studentInfo }).catch(next)
            resObj = { message: 'Update student successfully!' }
        }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj.push({
            at: 'studentId',
            message: 'Student not found!'
        })
    }
    await mongoose.disconnect().catch(next)
    res.status(resStatus).send(resObj)
}

/**
 * Delete Student API
 * @param {Request} req - The HTTP Request Object
 * @param {Response} res - The HTTP Response Object
 * @param {Function} next - The next() function
 */
const deleteStudent = async (req, res, next) => {
    let resStatus = RSC.OK
    let resObj = null
    await mongoose.connect(config.MONGOOSE_URI).catch(next)
    if (await Student.findOneAndDelete({ studentId: req.query.studentId }).catch(next)) {
        resObj = { message: 'Delete student successfully!' }
    } else {
        resStatus = RSC.BAD_REQUEST
        resObj = {
            at: 'studentId',
            message: 'Student not found!'
        }
    }
    await mongoose.disconnect().catch(next)
    res.status(resStatus).send(resObj)
}

exports.getStudent = getStudent
exports.postStudent = postStudent
exports.putStudent = putStudent
exports.deleteStudent = deleteStudent