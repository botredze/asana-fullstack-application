const db = require('../config/dbConfig');


class Task {
    async createTask(title, description, status, boardId, subtasks) {
        try {
            const result = await db.query('INSERT INTO tasks (title, description, status, boardId) VALUES (?, ?, ?, ?)', [title, description, status, boardId]);
            const taskId = result.insertId

            subtasks.forEach((tsk) => {
                 this.createSubtask(tsk.title, 0,taskId )
            })

            return taskId;
        } catch (error) {
            throw error;
        }
    }

     async createSubtask(title, isCompleted, taskId) {
        try {
            const query = 'INSERT INTO subtasks (title, IsCompleted, TaskId) VALUES (?, ?, ?)';
            const result = await db.query(query, [title, isCompleted, taskId])
            return result.insertId
        }catch (error) {
            throw error
        }
    }


    async getTasksByBoardId(boardId) {
        try {
            const result = await db.query('SELECT * FROM tasks WHERE BoardId = ?', [boardId])
            const tasks = result
            return tasks;
        } catch (error) {
            throw error;
        }

    }

    async updateSubtask(subtaskId, title, isCompleted) {
        try {
            console.log(subtaskId, title, isCompleted)
            const query = `UPDATE Subtasks
                           SET Title       = ?,
                               IsCompleted = ?
                           WHERE SubtaskId = ?`;
            const result = await db.query(query, [title, isCompleted, subtaskId])
            return result.insertId
        }catch (error) {
            throw error
        }
    }


    async updateTask(taskId, title, description, status, subtasks ) {
        try {
            const query = `
                UPDATE Tasks
                SET Title       = ?,
                    Description = ?,
                    Status      = ?
                WHERE TaskId = ?;
            `;

            await db.query(query, [title, description, status, taskId]);
            subtasks.forEach((subTsk)=> {
                if(subTsk.subtaskId) {
                    this.updateSubtask(subTsk.subtaskId, subTsk.title, subTsk.isCompleted)
                }else {
                    this.createSubtask(subTsk.title, subTsk.isCompleted, taskId)
                }
            } )
            return true;
        } catch (error) {
            throw error;
        }
    }

    async updateStatusTask(taskId, status) {
        try {
            const query = `
            update Tasks SET Status = ? where TaskId = ?`
            await db.query(query, [ status, taskId])
        }catch (error) {
            console.log(error)
            throw  error;
        }
    }
}

module.exports = new Task;
