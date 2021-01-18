const mongodb = require('mongoose')
mongodb.connect(process.env.DATABASE_URI)
const db = mongodb.connection

db.on('error',error=>{console.log(error)})
db.once('open', ()=>{console.log('Connected to Mongodb')})

module.exports = db