const db = require('../config/dbConfig');

class Board {
    async create(userId, name) {
        try {
            const result = await db.query('INSERT INTO Boards (UserId, Name) VALUES (?, ?)', [userId, name]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const boards = await db.query('SELECT * FROM Boards');
            return boards;
        } catch (error) {
            throw error;
        }
    }

    async getByUserId(userId) {
        try {
            const boards = await db.query('SELECT * FROM Boards WHERE UserId = ?', [userId]);
            return boards;
        } catch (error) {
            throw error;
        }
    }

    async update(boardId, name) {
        try {
            await db.query('UPDATE Boards SET Name = ? WHERE BoardId = ?', [name, boardId]);
        } catch (error) {
            throw error;
        }
    }

    async delete(boardId) {
        try {
            await db.query('DELETE FROM Boards WHERE BoardId = ?', [boardId]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Board();
