const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const date = require('date-and-time');
const timezone = require('mongoose-timezone')

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, 'Name can\'t be smaller than 5 characters'],
        maxlength: [64, 'Name can\'t be greater than 64 characters'],
        index: true
    },
    first_name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name can\'t be smaller than 3 characters'],
        maxlength: [64, 'Name can\'t be greater than 64 characters']
    },
    last_name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name can\'t be smaller than 3 characters'],
        maxlength: [64, 'Name can\'t be greater than 64 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [128,'Email can\'t be greater than 128 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }

})

userSchema.set('timestamps',true)
timezone.name="Europe/Istanbul"
userSchema.plugin(timezone)

userSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')){
        return next();
    }

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model('users', userSchema)
module.exports = User