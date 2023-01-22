// first access the username and password using the req.body
// if both of the above are available, then create a new JWT

//set up an authentication whereby only the request with JWT can access the dashboard


// first import the jwt package
const jwt = require('jsonwebtoken')

const login  = async(req, res) =>{

    try{

        const {username, password} = req.body
        console.log(username, password)

        if(!username || !password){

            res.status(400).json({msg: 'Please provide the full details'})
        }

        // temporary id, as theere is no DB at the moment

        const id = new Date().getDate()

        //sign method takes on 3 values: 1. payload, 2. jwt_secret and 3. options

        // 1. PAYLOAD
        // payload is an object and you can pass in anything you want but not a password that you usually use or confidential information 
        // payload should be small

        // 2.JWT_SECRET
        // JWT SECRET is set up in the .env and should a long string that no one should be able to guess

        const token = jwt.sign({id, username }, process.env.jwt_secret,  {expiresIn: '30d'}  )




        res.status(200).json({msg: 'created user', token})

    }

    catch(error){

        res.status(500).json({msg: error})
    }


}





// dashboard is where we will share our authorized data

const dashboard = async (req, res)=>{

    const token = Math.floor(Math.random() * 100)

    res.status(200).json({msg:`Hello Ryan`, secret: `Your authorized data and lucky number is ${token}`})
}


module.exports = {login, dashboard}