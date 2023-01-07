const express = require('express')
const app = express()
const port =  process.env.PORT ||  3000;
const task = require('./routes/task')
const connectDB = require('./DB/connection')
require('dotenv').config()
const error = require('../starter/middleware/error')




app.use(express.static('../starter/public'))



app.use(express.json())

// app.get('/hello', (req, res)=>{
//     res.send('Hello')
// })


app.use('/api/v1/tasks', task)


app.use(error)




// app.all('*', (req, res)=>{

//     res.send('Error page')
// })

const DB = async()=>{

    try{

        await connectDB(process.env.Mongo_secret_key)
        // await console.log('Connection is true')

        app.listen({port}, ()=>{
        
            console.log(`Server is listening on port ${port}`)
        })

    }

    catch(error){

        console.log(error)

    }
}

DB()



