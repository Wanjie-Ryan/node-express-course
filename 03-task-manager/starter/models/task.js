const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({

    // Basic structure of the database
    // key value pairs where the name and completed are the keys
    // after setting up the structure now come up with a model which is a representation of a collection

    // validation, only data with the specific attributes will be sent.
    name:{
        type:String,
        required:[true, 'Please provide the name'],
        trim:true, //ensures that there is no whitespace
        maxLength:[20, 'name cannot be more than 20 characters']
    }, 
    completed:{
        type:Boolean,
        default: false,
    } 

})

module.exports = mongoose.model('Task', TaskSchema) 