
const config = require('./config')
const DATA_LOCATION = config.DATA_LOCATION
const fs = require('fs/promises')
const mongoose = require('mongoose')
const {Student} = require('./models/student')
const {Account} = require('./models/account')
const {Attendance} = require('./models/attendance')
const {Fund} = require('./models/fund')
const out = require('./lib/out')

setImmediate(async () => {
    await mongoose.connect(config.MONGOOSE_URI)
    const studentData = await Student.find()
    const accountData = await Account.find()
    const attendanceData = await Attendance.find()
    const fundData = await Fund.find()
    await fs.writeFile(DATA_LOCATION.location(DATA_LOCATION.STUDENT), JSON.stringify(studentData))
    await fs.writeFile(DATA_LOCATION.location(DATA_LOCATION.ACCOUNT), JSON.stringify(accountData))
    await fs.writeFile(DATA_LOCATION.location(DATA_LOCATION.ATTENDANCE), JSON.stringify(attendanceData))
    await fs.writeFile(DATA_LOCATION.location(DATA_LOCATION.FUND), JSON.stringify(fundData))
    await mongoose.disconnect()
    out.log(out.success('Database exported successfully!'))
})