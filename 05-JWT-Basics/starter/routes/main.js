const express = require('express')
const router = express.Router()
const app = express()
const {login, dashboard} = require('../controllers/main')

const authmiddleware = require('../middleware/auth')



router.route('/dashboard').get(authmiddleware, dashboard)

//user will be posting his/her data
router.route('/login').post(login)




module.exports = router

