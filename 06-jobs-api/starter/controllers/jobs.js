const {StatusCodes} = require('http-status-codes')

const getAllJobs = async (req, res) => {
    res.send('');
  };

const createjob = async(req, res)=>{

    res.send(req.user)
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