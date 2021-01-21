require('dotenv').config()
require('./utils/mongodb.config')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const jobadRouter = require('./routes/jobad')
const usersRouter = require('./routes/user')

app.use('/api/jobAdvertisements', jobadRouter)
app.use('/api/users', usersRouter)

app.use(bodyParser.json())

app.listen(port, function () {
   console.log('Server started on port: ' + port)
})

