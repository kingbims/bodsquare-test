const Task = require('../models/task')
const { MSG_TYPES } = require('../constants/msgTypes')

class TaskService {
    createTask(userId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const task = await Task.create({
                    ...body,
                    userId
                })
                resolve(task)
            } catch (error) {
                error.source = 'Create Task Service'
                return reject(error)
            }
        })
    }

    readTasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const tasks = await Task.find()
                resolve(tasks)
            } catch (error) {
                error.source = 'Read Tasks Service'
                return reject(error)
            }
        })
    }

    updateTask(taskId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const task = await Task.findById(taskId)

                if (!task)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.NOT_FOUND
                })

                const updatedTask = await Task.findByIdAndUpdate(
                    { _id: taskId },
                    body,
                    { new: true }
                )
                resolve(updatedTask)
            } catch (error) {
                error.source = 'Update Task Service'
                return reject(error)
            }
        })
    }

    deleteTask(taskId) {
        return new Promise(async (resolve, reject) => {
            try {
                const task = await Task.findByIdAndDelete(taskId)

                if (!task)
                return reject({
                    code: 404,
                    msg: MSG_TYPES.NOT_FOUND
                })
                resolve()
            } catch (error) {
                error.source = 'Delete Task Service'
                return reject(error)
            }
        })
    }
}

module.exports = TaskService