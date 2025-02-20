// first access the username and password using the req.body
// if both of the above are available, then create a new JWT

//set up an authentication whereby only the request with JWT can access the dashboard


// first import the jwt package
const jwt = require('jsonwebtoken')

const {StatusCodes} = require('http-status-codes')

const login  = async(req, res) =>{

    try{

        const {username, password} = req.body
        console.log(username, password)

        if(!username || !password){

            res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide the full details'})
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




        res.status(StatusCodes.OK).json({msg: 'created user', token})

    }

    catch(error){

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }


}





// dashboard is where we will share our authorized data

const dashboard = async (req, res)=>{

    // console.log(req.headers)

    //validation of the header and send the data with the username

    // const authHeader = req.headers.authorization

    // if(!authHeader || !authHeader.startsWith('Bearer ')){


    //     res.status(401).json({msg:'No token has been provided'})


    //     // 401 is authorization error
    // }  

    // //split the authheader and pick the token which is the second value
    // const token = authHeader.split(' ')[1]
    
    const luckynum = Math.floor(Math.random() * 100)

    res.status(StatusCodes.OK).json({msg:`Hello ${req.user.username}`, secret: `Your authorized data and lucky number is ${luckynum}`})




    // res.status(200).json({msg:`Hello ${decoded.username}`, secret: `Your authorized data and lucky number is ${luckynum}`})


    // try{

    //     // verification of the token, pass in the token and the secret key in the .env
    //     const decoded = jwt.verify(token, process.env.jwt_secret)
    //     // console.log(decoded)
        
    // }

    // catch(error){

    //     res.status(401).json({msg:'Not authorized to access this route'})


    // }


    // console.log(token)
}


module.exports = {login, dashboard}