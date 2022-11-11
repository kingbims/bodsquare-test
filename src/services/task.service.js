const Task = require('../models/task')
const { MSG_TYPES } = require('../constants/msgTypes')
const { producer, receiver } = require('../utils/msgQueue')


class TaskService {
    createTask(userId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                await producer()
                const task = await Task.create({
                    ...body,
                    userId
                })
                resolve(task)
                await receiver()
            } catch (error) {
                error.source = 'Create Task Service'
                return reject(error)
            }
        })
    }

    readTasks(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const tasks = await Task.find({ userId })
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