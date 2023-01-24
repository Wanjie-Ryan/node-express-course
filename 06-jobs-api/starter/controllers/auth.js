
const user = require('../models/User')
const {StatusCodes} = require('http-status-codes')


const register = async (req, res) => {
//   res.send("register user");

// CREATED is for creating a resource.(201)

    try{

        // req.body is passed in as we want mongoose to do all the validation

        const newuser = await user.create({...req.body})


        res.status(StatusCodes.CREATED).json({newuser})
    }

    catch(error){

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }


};









const login = async (req, res) => {
  res.send("login user");
};


module.exports = {register, login}