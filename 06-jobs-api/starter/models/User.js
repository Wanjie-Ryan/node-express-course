const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, 'Please provide the name'],
        minlength:4,
        maxlength:37,
    },

    email:{
        type: String,
        required:[true, 'Please provide the email'],

        // match creates a validator that checks if the value matches the given regular expression

        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email',
            
            ], 

            // creates a unique index
            unique:true,

    },

    password:{

        type: String,
        required:[true, 'Please provide password' ],
        minlength: 6,
        // maxlength:12,
    },


})

UserSchema.pre('save', async function(){


    const salt = await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password, salt)

})








module.exports = mongoose.model('user', UserSchema)