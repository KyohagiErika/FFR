const config = require('./config')
const { MongoClient } = require('mongodb')
const out = require('./lib/out')

setTimeout(async () => {
    const client = new MongoClient(config.MONGO_URI)
    await client.connect()
    const db = client.db(config.MONGO_URI)
    out.log(out.success('Database is connected successfully!'))
    client.close()
}, 0)