
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.post('/create', TaskController.createTask);
router.get('/:boardId', TaskController.getTasksByBoardId);
router.put('/:taskId', TaskController.updateTaskController);
router.put('/updateStatus/:taskId', TaskController.updateStatusTask)
module.exports = router;
