require('dotenv').config()

const connectDB = require('./db/connect')
const products = require('./products.json')
const models = require('./models/product')


const mongooseconnect = async()=>{

    try{
        
        await connectDB(process.env.mongoDB)

        await models.create(products)
        console.log('success')
        process.exit(0) // exites outside of the database
    }

    catch(error){
        console.log(error)
    }
}

mongooseconnect()