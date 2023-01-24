

const getAllJobs = async (req, res) => {
    res.send("get all jobs");
  };

const createjob = async(req, res)=>{

    res.send('create a job')
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