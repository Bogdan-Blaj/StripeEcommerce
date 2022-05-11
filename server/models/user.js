const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 12;
require('dotenv').config();


const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password : {
        type: String,
        required: true,
        minlength: 5
    },
    firstName : {
        type: String,
        required: true,
        maxlength: 30
    },
    lastName : {
        type: String,
        required: true,
        maxlength: 30
    },
    id: {
        type: String
    },
    cart : {
        type : Array,
        default: []
    },
    history : {
        type: Array,
        default: []
    },
    role : {
        type: Number,
        default : 0
    },
    token : {
        type: String
    }
});

//========================================
//            Encrypt Password
//========================================

//ES5 for compatibility reasons
// userSchema.pre('save', function(next){
//     var user = this;
    
//     //listening to changing the password field, else move forward
//     if(user.isModified('password')){
//         bcrypt.genSalt(SALT_I, function(err, salt){
//             if (err)
//                 return next(err);

//             bcrypt.hash(user.password, salt, function(err, hash) {
//                 if (err)
//                     return next(err);

//                 user.password = hash;
//                 next();
//             });
//         })
//     }
// })


//========================================
//            SAVE in DB
//========================================
const User = mongoose.model('User', userSchema);
module.exports = { User }