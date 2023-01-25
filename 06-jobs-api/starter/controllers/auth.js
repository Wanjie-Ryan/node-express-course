
const user = require('../models/User')
const {StatusCodes} = require('http-status-codes')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const register = async (req, res) => {
//   res.send("register user");

// CREATED is for creating a resource.(201)

    try{

        // CONTROLLER VALIDATOR
        //CHECKING OF ERRORS IN THE CONTROLLER.

        // const {name, email, password} = req.body;

        // if(!name || !email || !password){

        //     res.status(StatusCodes.BAD_REQUEST).json({msg:"provide full details!"})
        // }


            // USING BCRYPT
        
            // const {name, email, password} = req.body

            // salt is used to generate random bytes 
            // 10 refers to how many number of bytes will be returned
            // const salt = await bcrypt.genSalt(10)

            //generates the hashed passwords
            // const hashedpassword = await bcrypt.hash(password, salt)

            // const userorigi ={name, email, password:hashedpassword}

             // USING BCRYPT

        // MONGOOSE VALIDATOR

        // req.body is passed in as we want mongoose to do all the validation


        const newuser = await user.create({...req.body})


        // const token = jwt.sign({userId:newuser._id, name:newuser.name },  'jwt_secret' , {expiresIn:'10d' })
        const token = newuser.jwtoken()

        res.status(StatusCodes.CREATED).json({name:newuser.name, token})
    }

    catch(error){

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }


};









const login = async (req, res) => {


    try{

        //controller validator

        const {email, password} = req.body
    
        if(!email || !password){
    
            res.status(StatusCodes.UNAUTHORIZED).json({msg:'Provide the full details please.'})
        }

        const newuser = await user.findOne({email})


        // if email does not exist in the database, then throw the error
        if(!newuser){

            res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid email address'})
        }


        // CHECKS IF PASSWORD MATCHES
        const correctpassword = await newuser.checkpwd(password)

        if(!correctpassword){

            res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid password'})
        }

        // if(!newuser && !correctpassword){

        //     res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid email address and password! Kua serious jameni'})
        // }


        const token = newuser.jwtoken()

        res.status(StatusCodes.OK).json({name:newuser.name, token})


    }


    catch(error){


        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
    }










  
};


module.exports = {register, login}