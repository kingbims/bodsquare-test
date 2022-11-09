const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            lowerCase: true,
            validate: [validator.isEmail]
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User