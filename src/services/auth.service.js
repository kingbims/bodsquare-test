require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

class AuthService {
    signUp (body) {
        return new Promise(async (resolve, reject) => {
            try {
                const existingUser = await User.findOne({ email: body.email })

                if (existingUser)
                return reject({
                    code: 400,
                    msg: ''
                })

                const hashPassword = await bcrypt.hash(
                    body.password,
                    Number(process.env.JWT_SALT)
                )
                body.password = hashPassword

                const user = await User.create(body)
                resolve(user)
            } catch (error) {
                error.source = 'SignUp Service'
                return reject(error)
            }
        })
    }

    signIn (body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ email: body.email })

                if (!user) 
                return reject({
                    code: 404,
                    msg: `This email address ${body.email} is not associated with any account. Please check and try again`
                })

                const isEqual = await bcrypt.compare(body.password, user.password)

                if (!isEqual)
                return reject({
                    code: 400,
                    msg: 'Password incorrect'
                })

                user.password = undefined
                const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '3d' })

                if (!token)
                return reject({
                    code: 400,
                    msg: 'Could not sign user in'
                })

                resolve({ user, token })
            } catch (error) {
                error.source = 'Login Service'
                return reject(error)
            }
        })
    }
}

module.exports = AuthService