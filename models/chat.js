const mongoose = require('mongoose')
const timezone = require('mongoose-timezone')
const moment = require('moment')

const chatSchema = mongoose.Schema({
        joiners:{
            type:[String],
            required: [true]
        },

	    messages: {
            type: [{owner:{
                type:String,
                required:[true]
            },
            content:{
                type:mongoose.Schema.Types.Mixed,
                required:[true]
            },
            createdAt:{
                type: Date,
                required:[true]
            }}]
        }             
	

    
})


timezone.name = process.env.TIMEZONE
chatSchema.plugin(timezone)

chatSchema.pre('save', function (next) {
    if ('invalid' == this.name) {
      return next(new Error('#sadpanda'));
    }
    next();
  });

const Chat = mongoose.model('chats', chatSchema)

module.exports = Chat