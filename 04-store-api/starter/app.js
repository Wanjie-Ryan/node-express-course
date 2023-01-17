const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const notfound = require('./middleware/not-found')
// const errorhandler = require('./middleware/errorhandler')
const connectDB = require('./db/connect')
require('dotenv').config()




// middlewares

app.use(express.json())

//routes

app.get('/', (req, res)=>{
    res.send('<h1> Store API </h1><a href ="/api/v1/products">Products</a')
})


// products route

app.use(notfound)


const DB = async()=>{

    try{

        // connecting to the DB
        await connectDB(process.env.mongoDB);
        app.listen({port}, ()=>{
            console.log(`server is listneing on port,${port}`)
        })

    }

    catch(error){

        console.log(error)
    }



}

DB()









