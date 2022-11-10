const bcrypt = require('bcrypt')
const User = require('../models/user')
const { MSG_TYPES } = require('../constants/msgTypes')

class UserService {
    getProfile(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId)

                if (!user)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.NOT_FOUND
                })

                resolve(user)
            } catch (error) {
                error.source = 'Get Profile Service'
                return reject(error)
            }
        })
    }

    updateProfile(userId, updateId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId)

                if (!user)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.NOT_FOUND
                })

                if (userId != updateId)
                return reject({
                    code: 400,
                    msg: MSG_TYPES.ACCESS_DENIED
                })
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: userId },
                    data,
                    { new: true }
                )

                resolve(updatedUser)
            } catch (error) {
                error.source = 'Update User Service'
                return reject(error)
            }
        })
    }

    changePassword (userId, oldPassword, newPassword) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId)

                if (!user)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.NOT_FOUND
                })

                const isEqual = await bcrypt.compare(oldPassword, user.password)

                if (!isEqual)
                return reject({
                    code: 400,
                    msg: MSG_TYPES.INCORRECT_PASSWORD
                })

                const hash = await bcrypt.hash(
                    newPassword,
                    Number(process.env.JWT_SALT)
                )

                await User.updateOne({ password: hash }).where({ _id: userId })
                resolve()
            } catch (error) {
                error.source = 'Change Password Service'
                return reject(error)
            }
        })
    }

    deleteProfile (userId, updateId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId)

                if (!user)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.NOT_FOUND
                })

                if (userId != updateId)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.ACCESS_DENIED
                })

                const isEqual = await bcrypt.compare(body.password, user.password)

                if (!isEqual)
                return reject({
                    code: 400,
                    msg: MSG_TYPES.INCORRECT_PASSWORD
                })

                await User.findByIdAndDelete(userId)
                resolve()
            } catch (error) {
                error.source = 'Delete User Service'
                return reject(error)
            }
        })
    }
}

module.exports = UserService