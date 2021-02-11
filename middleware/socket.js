var socketio = require('socket.io')
const jwt = require('jsonwebtoken')
const saveMessage = require('../routes/chat').saveMessage

socketAuth = (socket,next)=>{
    if (socket.handshake.auth && socket.handshake.auth.token){
        try {
            const token = socket.handshake.auth.token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            socket.decoded = decodedToken
            next()
        } catch (error) {
            console.error("Auth Failed invalid jwt:"+error)
        }
      }
      else {
        console.error("Auth Failed no login")
      }    
    }

module.exports.listen = function(app){

    var connectedUsers = {}

    io = socketio(app)
     
    
    authorizeSocket =  io.use(socketAuth)

    
//listen on every connection
authorizeSocket.on('connection', (socket) => {
	

	
    socket.username = socket.decoded.user_name
    connectedUsers[socket.username] = socket
    console.log(`${socket.username} connected`)

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
//        io.sockets.emit('new_message', {message : data.message, from : socket.username});

        //private message
        


        if(connectedUsers[data.to]){
            connectedUsers[data.to].emit('private_message',{message:data.message, from: socket.username})

            saveMessage(data.message,data.to,socket.username)

            console.log("message sent and saved")
        }else{
            
            saveMessage(data.message,data.to,socket.username)

            console.log("message saved")
        }
        
        
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    //listen on disconnect
    socket.on("disconnect", () => {
        delete connectedUsers[socket.username]
    })



   })

    return io
}