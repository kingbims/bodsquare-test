const { JsonResponse } = require('../utils/apiResponse')
const { validateUser, validateLogin } = require ('../validation/user.validation')
const { MSG_TYPES } = require('../constants/msgTypes')
const AuthService = require('../services/auth.service')

const authInstance = new AuthService()

exports.register = async (req, res, next) => {
    try {
        const { error } = validateUser(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const newUser = await authInstance.signUp(req.body)
        return JsonResponse(res, 201, 'Registration Successful', newUser)
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const { user, token } = await authInstance.signIn(req.body)
        res.header('x-auth-token', token)

        JsonResponse(res, 200, MSG_TYPES.LOGGED_IN, user)
    } catch (error) {
        next(error)
    }
}