const db = require('../config/dbConfig');

class Subtask {
    static async createSubtask(title, isCompleted, taskId) {
        try {
            const query = 'INSERT INTO subtasks (title, IsCompleted, TaskId) VALUES (?, ?, ?)';
            const result = await db.query(query, [title, isCompleted, taskId])
            return result.insertId
        }catch (error) {
            throw error
        }
    }


    static async updateSubtask(subtaskId, title, isCompleted) {
        try {
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

    static async updateStatusSubTask(subtaskId, isCompleted) {
        try {
            const query = `UPDATE Subtasks
                           SET  IsCompleted = ?
                           WHERE SubtaskId = ?`;
            const result = await db.query(query, [isCompleted, subtaskId])
            return result.insertId
        }catch (error) {
            throw error
        }
    }

}

module.exports = Subtask;
