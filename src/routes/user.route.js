const express = require('express')
const Auth = require('../middlewares/auth')
const {
    getProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/user.controller')

const router = express.Router()

router.get('/', [Auth], getProfile)
router.put('/:id', [Auth], updateProfile)
router.delete('/:id', [Auth], deleteProfile)


module.exports = router