const {StatusCodes} = require('http-status-codes')
const jobs = require('../models/Job')



const getAllJobs = async (req, res) => {
    
    try{

      //will only return the jobs created by the specific id 

      const personjobs = await jobs.find({createdBy:req.user.userId}).sort('createdAt')

      res.status(StatusCodes.OK).json({personjobs})



    }

    catch(error){

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }

  };

const createjob = async(req, res)=>{

    try{

      // you are adding the createdby of the mongoose model property to the req.body

      // the userid of the person who created the job is passed onto the craetedby property

      req.body.createdBy = req.user.userId

      const personjobs = await jobs.create({...req.body})
      
      res.status(StatusCodes.CREATED).json({personjobs})

      // res.send(req.user)



    }

    catch(error){


      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }







}
  
  const getsingleJob = async (req, res) => {
    res.send("getsingleJob");





  };

  const updatejob = async(req, res)=>{

    res.send('update job')





  }

  const deletejob = async(req, res)=>{

    res.send('delete job')



  }
  
  
  module.exports = {

                     getAllJobs,
                     createjob,
                     getsingleJob,
                     updatejob,
                     deletejob

                    }