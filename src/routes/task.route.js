const express = require('express')
const Auth = require('../middlewares/auth')
const {
    createTask,
    readTasks,
    updateTask,
    deleteTask
} = require('../controllers/task.controller')

const router = express.Router()

router.post('/', [Auth], createTask)
router.get('/', [Auth], readTasks)
router.put('/:id', [Auth], updateTask)
router.delete('/:id', [Auth], deleteTask)


module.exports = router