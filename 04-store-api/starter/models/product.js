const mongoose = require('mongoose')

const productschema = new mongoose.Schema({


    name:{

        type:String,
        required:[true, 'product name must be provided']

    },

    price:{

        type:Number,
        required:[true, 'product price must be provided']
    },

    featured:{
        type:Boolean,
        default:false
    },

    rating:{

        type:Number,
        default:4.5
    },

    createdAt:{

        type:Date,
        default:Date.now()
    },

    company:{
       
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:'{VALUE} is not supported'

            //accesses the values user is providing
        }


    }

    // enum:['ikea', 'liddy', 'caressa', 'marcos']  
    // enum specifies the specific thing to be added to the DB, other than that it is an error


})

module.exports = mongoose.model('product', productschema)