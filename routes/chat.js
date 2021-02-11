const express = require('express')
const { ObjectID } = require('mongodb')
const auth = require('../middleware/auth')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const chat = require('./../models/chat')
const moment = require('moment')

router.get('/', auth, async (req, res) => {
    try {
        let allChat = await chats.find(
            { joiners: req.userData.user_name }
        )
        res.status(200).send(allChat)
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})


saveMessage = async (message,to,from) => {

    let newMsg = {
        owner: from,
        content: message,
        createdAt: new Date(moment().locale("tr"))
    }

    const theChat = await chat.findOneAndUpdate(
        {$and : [
            {joiners: to},
            {joiners: from}
        ]},
        {
            $push: {messages: newMsg}
        }

    )
    console.log("theChat: "+theChat)
    
    if(!theChat) //chat başlangıcı
    {        
        console.log("iff")
        let newChat = await chat(
            {
                joiners:[to,from],
                messages: newMsg
            }
        ).save()
        console.log("newChat: "+newChat)
    }

    
}



module.exports.router = router
module.exports.saveMessage = saveMessage