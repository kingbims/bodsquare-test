const Joi = require('joi')

function createTaskValidation (task) {
  const Schema = Joi.object().keys({
    description: Joi.string().required(),
  })

  return Schema.validate(task)
}

function updateTaskValidation (task) {
  const Schema = Joi.object().keys({
    description: Joi.string(),
    completed: Joi.boolean()
  })

  return Schema.validate(task)
}


module.exports = {
    createTaskValidation,
    updateTaskValidation
}
