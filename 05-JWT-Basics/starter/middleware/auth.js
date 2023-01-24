// setting up a middleware so that every route that requires to be authenticated is done so, saves time instaed of authenticating each and every route.
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken')


const authmiddleware = async(req, res, next)=>{

// console.log(req.headers.authorization)


    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){


        res.status(StatusCodes.UNAUTHORIZED).json({msg:'No token has been provided'})



    
    }

    const token = authHeader.split(' ')[1]


    try{

        const decoded = jwt.verify(token, process.env.jwt_secret)
        const{id, username} = decoded
        req.user ={id, username}
        next()
    }


    catch(error){

        res.status().json({msg:error})
    }


}



module.exports = authmiddleware





