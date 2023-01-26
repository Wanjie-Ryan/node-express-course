const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    company:{
        type:String,
        required:[true, 'please provide the name of the company'],
        maxlength:35
    },

    position:{
        type:String,
        required:[true, 'please provide your position'],
        maxlength:30
    },

    status:{
        type:String,
        enum:['interview', 'declined' ,'pending'],
        default:'pending'
    },



    // createdby helps to tie the jobs created to the actual user who created them.(they are tow different collections in the DB and therefore you link them)

    //tying the jobs model to the user model
    // ref is used to specify which model you are referencing

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true, 'Provide the user']
    }


}, {timestamps:true})

module.exports = mongoose.model('jobs', jobSchema )