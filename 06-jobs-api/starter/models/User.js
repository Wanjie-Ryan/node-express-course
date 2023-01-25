const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

//use the function keyword as it always points to the document and you can access the details using this keyword.

UserSchema.methods.jwtoken = function(){

    return jwt.sign({userId:this._id, name:this.name}, process.env.jwt_secret, {expiresIn: process.env.jwt_expires})


} 

// BCRYPT HAS A METHOD CALLED COMPARE THAT ALLOWS YOU TO COMPARE HASHED PASSWORDS AND CHECK IF THEY MATCH
// the method checks for the value coming in with the request which is the candidatepassword and is passed in as an argument


UserSchema.methods.checkpwd = async function(candidatePassword){

    const ismatch = await bcrypt.compare(candidatePassword, this.password)

    return ismatch

}



module.exports = mongoose.model('user', UserSchema)