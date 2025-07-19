const express = require('express')
const { userController } = require('../controller/userController')

// routes
// user data || GET
router.post('/get-user', userController)

module.exports = router