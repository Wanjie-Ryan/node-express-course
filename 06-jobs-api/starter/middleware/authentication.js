const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const user = require('../models/User')



const authmiddleware = async (req, res, next)=>{

    // CHECKING THE HEADER

    const authheader = req.headers.authorization
    
    if(!authheader || !authheader.startsWith('Bearer')){
    
        res.send(StatusCodes.UNAUTHORIZED).json({msg:'Invalid Person'})
    

}    


    //split method turns the token into an array and seeks for the value with index of 1

    const token = authheader.split(' ')[1]

    try{

        //VERIFICATION OF THE TOKEN

        const verification = jwt.verify(token, process.env.jwt_secret)

        req.user ={userId:verification.id , name:verification.name}

        next()
    }

    catch(error){


        res.status(500).json({msg:'Something went wrong, trying to resolve..'})
    }

}


module.exports = authmiddleware