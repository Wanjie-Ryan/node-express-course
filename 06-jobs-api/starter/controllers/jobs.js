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
    

    try{

       // params is provided by express.
       //jobId is just an alias that is passed as a parameter 
       //we can access userId because we have access to the token.
      const {user:{userId}, params:{id:jobId}} = req

      //finding the job whose jobid matches it and for specifically that one user who created the job.

      const personjobs = await jobs.findOne({_id:jobId, createdBy:userId})

      if(!personjobs){

        res.status(StatusCodes.NOT_FOUND).json({msg:`job with id ${jobId} cannot be found`})
      }

      res.status(StatusCodes.OK).json({personjobs})


    }

    catch(error){

      // if(err.name == 'CastError'){

      //   res.status(StatusCodes.NOT_FOUND).send(msg = `No item with id ${err.value}`)
      // }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})

    }


  };

  const updatejob = async(req, res)=>{
      
    try{

      // destructuring the req functionality into req.user, req.params and req.body

      const {user:{userId}, params:{id:jobId}, body:{company, position}} = req

      if(company == '' || position == ''){
        res.status(StatusCodes.BAD_REQUEST).json({msg:'Provide the company and position fields!'})
      }

      const personsjobs = await jobs.findOneAndUpdate({_id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true})

      if(!personsjobs){

        res.status(StatusCodes.NOT_FOUND).json({msg:`person with jobId ${jobId} cannot be found`})
      }

      res.status(StatusCodes.OK).json({personsjobs})



    }

    catch(error){

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }



  }

  const deletejob = async(req, res)=>{

    try{

      const{user:{userId}, params:{id:jobId}} = req

      const personsjobs = await jobs.findOneAndRemove({_id:jobId, createdBy:userId})

      if(!personsjobs){

        res.status(StatusCodes.BAD_REQUEST).json({msg:`person with the job id${jobId} was not found`})


      }

      res.status(StatusCodes.OK).json({personsjobs})



    }

    catch(error){


      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})



    }



  }
  
  
  module.exports = {

                     getAllJobs,
                     createjob,
                     getsingleJob,
                     updatejob,
                     deletejob

                    }