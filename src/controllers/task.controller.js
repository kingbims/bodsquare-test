const { JsonResponse } = require('../utils/apiResponse')
const { 
    createTaskValidation,
    updateTaskValidation
} = require ('../validation/task.validation')
const { MSG_TYPES } = require('../constants/msgTypes')
const TaskService = require('../services/task.service')

const taskInstance = new TaskService()

exports.createTask = async (req, res, next) => {
    try {
        const { error } = createTaskValidation(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const task = await taskInstance.createTask(req.user.id, req.body)
        JsonResponse(res, 201, MSG_TYPES.CREATED, task)
    } catch (error) {
        next(error)
    }
}

exports.readTasks = async (req, res, next) => {
    try {
        const tasks = await taskInstance.readTasks()
        JsonResponse(res, 200, MSG_TYPES.FETCHED, tasks)
    } catch (error) {
        next(error)
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const { error } = updateTaskValidation(req.body)
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const task = await taskInstance.updateTask(req.params.id, req.body)
        JsonResponse(res, 201, MSG_TYPES.UPDATED, task)
    } catch (error) {
        next(error)
    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await taskInstance.deleteTask(req.params.id)
        JsonResponse(res, 201, MSG_TYPES.DELETED, task)
    } catch (error) {
        next(error)
    }
}