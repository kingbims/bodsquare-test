const { JsonResponse } = require('../utils/apiResponse')
const { 
    validateUpdateUser,
    validateChangePassword,
    validateDeleteUser
} = require ('../validation/user.validation')
const { MSG_TYPES } = require('../constants/msgTypes')
const UserService = require('../services/user.service')

const userInstance = new UserService()

exports.getProfile = async (req, res, next) => {
    try {
        JsonResponse(res, 200, MSG_TYPES.FETCHED, req.user)
    } catch (error) {
        next(error)
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const { error } = validateUpdateUser(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const response = await userInstance.updateProfile(
            req.user.id,
            req.params.id,
            req.body
        )
        JsonResponse(res, 200, MSG_TYPES.UPDATED, response)   
} catch (error) {
        next(error)
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const { error } = validateChangePassword(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const response = await userInstance.changePassword(
            req.user.id,
            req.body.oldPassword,
            req.body.newPassword
        )
        JsonResponse(res, 200, MSG_TYPES.UPDATED, response)   
} catch (error) {
        next(error)
    }
}

exports.deleteProfile = async (req, res, next) => {
    try {
        const { error } = validateDeleteUser(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const response = await userInstance.deleteProfile(
            req.user.id,
            req.params.id,
            req.body
        )
        JsonResponse(res, 200, MSG_TYPES.DELETED, response)   
} catch (error) {
        next(error)
    }
}