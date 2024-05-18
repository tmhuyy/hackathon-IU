const express = require('express')
const router = express.Router()

const testController = require('../controllers/testControllers')

router.route('/').get(testController.testFunction)

module.exports = router
