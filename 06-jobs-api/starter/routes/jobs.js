const express = require('express')
const router = express.Router()
const {getAllJobs,createjob ,getsingleJob, updatejob, deletejob} = require('../controllers/jobs')





router.route('/').get(getAllJobs).post(createjob)
router.route('/:id').get(getsingleJob).delete(deletejob).patch(updatejob)





module.exports = router