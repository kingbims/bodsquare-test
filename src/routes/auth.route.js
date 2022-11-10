const express = require('express')
const {
    register,
    login
} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/sign-up', register)
router.post('/login', login)

module.exports = router