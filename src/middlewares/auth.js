require('dotenv').config()
const jwt = require('jsonwebtoken')
const { JsonResponse } = require('../utils/apiResponse')
const { MSG_TYPES } = require('../constants/msgTypes')
const User = require('../models/user')

const Auth = async (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return JsonResponse(res, 401, MSG_TYPES.ACCESS_DENIED)
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const currentUser = await User.findById(decoded.id)

        if (!currentUser) return JsonResponse(res, 406, 'User could not be fetched')

        currentUser.password = undefined
        req.user = currentUser
        next()
    } catch (error) {
        if (error === 'TokenExpiredError') {
            return JsonResponse(res, 403, MSG_TYPES.SESSION_EXPIRED)
        }
        JsonResponse(res, 406, 'USER NOT FOUND or TOKEN INCOMPLETE')
    }
}


module.exports = Auth