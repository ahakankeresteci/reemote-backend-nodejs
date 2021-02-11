require('dotenv').config()
require('./utils/mongodb.config')
var path = require('path')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

//app.use( express.static(__dirname + '/public' ) )



const jobadRouter = require('./routes/jobad')
const usersRouter = require('./routes/user')
const chatRouter = require('./routes/chat').router

app.use('/api/jobAdvertisements', jobadRouter)
app.use('/api/users', usersRouter)
app.use('/api/chats',chatRouter)
//app.get('*', function (req, res){res.sendFile(path.join(__dirname+'/public/index.html'))})

app.use(bodyParser.json())


const server = app.listen(port, function () {
   console.log('Server started on port: ' + port)
})


const io = require('././middleware/socket').listen(server)
