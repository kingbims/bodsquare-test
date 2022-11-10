const Joi = require('joi')

function validateUser (user) {
  const Schema = Joi.object().keys({
    firstName: Joi.string()
      .max(30)
      .required(),
    lastName: Joi.string()
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .max(50)
      .required(),
    password: Joi.string()
      .min(7)
      .required(),
  })

  return Schema.validate(user)
}

function validateLogin (user) {
  const Schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .max(50)
      .required(),
    password: Joi.string()
      .min(7)
      .required()
  })

  return Schema.validate(user)
}

function validateUpdateUser (user) {
  const Schema = Joi.object().keys({
    firstName: Joi.string()
      .max(30)
      .optional(),
    lastName: Joi.string()
      .max(30)
      .optional(),
  })

  return Schema.validate(user)
}

function validateChangePassword (user) {
  const Schema = Joi.object().keys({
    oldPassword: Joi.string()
      .min(7)
      .required(),
    newPassword: Joi.string()
      .min(7)
      .required()
  })

  return Schema.validate(user)
}

function validateDeleteUser (user) {
  const Schema = Joi.object().keys({
    password: Joi.string().min(7).required()
  })
  return Schema.validate(user)
}

module.exports = {
  validateUser,
  validateLogin,
  validateUpdateUser,
  validateChangePassword,
  validateDeleteUser
}
