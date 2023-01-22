const express = require('express')
const router = express.Router()
const app = express()
const {login, dashboard} = require('../controllers/main')





router.route('/dashboard').get(dashboard)

//user will be posting his/her data
router.route('/login').post(login)




module.exports = router

