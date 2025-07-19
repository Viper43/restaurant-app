const express = require('express')
const { testUserController } = require('../controller/testController')

// router object
const router = express.Router()

// routes
router.get('/test-user', testUserController)

// export router
module.exports = router
