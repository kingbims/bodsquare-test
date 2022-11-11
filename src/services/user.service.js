const bcrypt = require('bcrypt')
const User = require('../models/user')
const { MSG_TYPES } = require('../constants/msgTypes')
const Task = require('../models/task')

class UserService {
    getProfile (userId) {
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

    updateProfile (userId, updateId, data) {
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
                await Task.findByIdAndDelete(userId)
                resolve()
            } catch (error) {
                error.source = 'Delete User Service'
                return reject(error)
            }
        })
    }
}

module.exports = UserService