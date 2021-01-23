const mongoose = require('mongoose')
const timezone = require('mongoose-timezone')

const jobadSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    author_user_name: {
        type: String,
        required: [true, 'Author is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    image_url: {
        type: String,
        required: [true, 'image_url is required']
    },
    price: {
        type: String,
        required: [true, 'price is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

jobadSchema.set('timestamps', true)
timezone.name = process.env.TIMEZONE
jobadSchema.plugin(timezone)

const Jobad = mongoose.model('jobads', jobadSchema)
module.exports = Jobad