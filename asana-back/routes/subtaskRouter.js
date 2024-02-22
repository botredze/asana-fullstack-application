const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');

router.post('/create', subtaskController.createSubtask);
router.put('/isComplete/:subtaskId', subtaskController.updateStatusSubTask)

module.exports = router;
