const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')

router.post('/', controller.getUsernamePassword)


module.exports = router