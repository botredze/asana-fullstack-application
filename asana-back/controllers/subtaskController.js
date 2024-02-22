const Subtask = require('../models/Subtasks');

exports.createSubtask = async (req, res) => {
    const { title, isCompleted, taskId } = req.body;
    try {
        const subtaskId = await Subtask.createSubtask(title, isCompleted, taskId);
        res.status(201).json({ subtaskId });
    } catch (error) {
        console.error('Ошибка при создании подзадачи:', error);
        res.status(500).json({ error: 'Ошибка при создании подзадачи' });
    }
};


exports.updateStatusSubTask = async (req, res) => {
    const {isCompleted} = req.body
    const {subtaskId} = req.params

    try {
        if(!isCompleted && !subtaskId) {
            res.status(404).json({message: 'Bad request'})
        }

        await Subtask.updateStatusSubTask(subtaskId, isCompleted)
        res.status(201).json({ message: 'success'})
    }catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}
