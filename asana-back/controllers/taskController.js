const Task = require('../models/Tasks');

class TaskController {
    async createTask(req, res) {
        const {title, description, status, boardId, subtasks} = req.body;
        try {
            const taskId = await Task.createTask(title, description, status, boardId, subtasks);
            console.log('huihui')
            res.status(201).json({taskId});
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
            res.status(500).json({error: 'Ошибка при создании задачи'});
        }
    }


    async getTasksByBoardId(req, res) {
        const {boardId} = req.params;
        console.log(boardId)
        try {
            const tasks = await Task.getTasksByBoardId(boardId);
            res.status(200).json({tasks});
        } catch (error) {
            console.error('Ошибка при получении задач по доске:', error);
            res.status(500).json({error: 'Ошибка при получении задач по доске'});
        }
    };

    async updateTaskController(req, res) {
        try {
            console.log(req.body)
            const {taskId} = req.params
            const { title, description, status, subtasks} = req.body;

            if (!taskId || !title || !status) {
                return res.status(400).json({ message: 'Не хватает обязательных данных' });
            }
            await Task.updateTask(taskId, title, description, status, subtasks);
            return res.status(200).json({ message: 'Задача успешно обновлена' });
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }

    async updateStatusTask(req,res) {
        try {
            const {taskId} = req.params
            const {status} = req.body

            console.log(req.body)
            console.log(taskId, status)
            if(taskId && status) {
                await Task.updateStatusTask(taskId, status)
                return res.status(200).json({ message: 'Задача успешно обновлена' })
            }
        }catch (error) {
            return res.status(500).json({ message:'Internal server error'})
        }
    }
}


module.exports = new TaskController
