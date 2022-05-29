const config = require('./config')
const DATA_LOCATION = config.DATA_LOCATION
const fs = require('fs/promises')
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const Student = require('./models/student')
const Account = require('./models/account')
<<<<<<< HEAD
const Attendance = require('./models/attendance')
=======
const Admin = require('./models/admin')
>>>>>>> c6f9ed77f3d66c2bd6b6ace9fe8981618e9d9980
const out = require('./lib/out')

setImmediate(async () => {
    const client = new MongoClient(config.MONGO_URI)
    await client.connect()
    await client.db(config.DATABASE_NAME).dropDatabase()
    await client.close()
    await mongoose.connect(config.MONGOOSE_URI)
    const admin = new Admin({
        username: config.ADMIN_USERNAME,
        pass: config.ADMIN_PASSWORD,
        displayName: config.ADMIN_DISPLAY_NAME
    })
    await admin.save()
    const studentData = JSON.parse(await fs.readFile(DATA_LOCATION.location(DATA_LOCATION.STUDENT)))
    const accountData = JSON.parse(await fs.readFile(DATA_LOCATION.location(DATA_LOCATION.ACCOUNT)))
    const attendanceData = JSON.parse(await fs.readFile(DATA_LOCATION.location(DATA_LOCATION.ATTENDANCE)))
    await Student.insertMany(studentData)
    await Account.insertMany(accountData)
    await Attendance.insertMany(attendanceData)
    await mongoose.disconnect()
    out.log(out.success('Database initialized successfully!'))
})