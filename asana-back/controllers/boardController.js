const Board = require('../models/Boards');

class BoardController {
    async create(req, res) {
        try {
            const { userId, name } = req.body;
            console.log(userId, name)
            const boardId = await Board.create(userId, name);
            res.status(201).json({ message: 'Board created successfully', boardId });
        } catch (error) {
            console.error('Error creating board:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAll(req, res) {
        try {
            const boards = await Board.getAll();
            res.status(200).json(boards);
        } catch (error) {
            console.error('Error fetching boards:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getByUserId(req, res) {
        try {
            const { userId } = req.params;
            const boards = await Board.getByUserId(userId);
            res.status(200).json(boards);
        } catch (error) {
            console.error('Error fetching user boards:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req, res) {
        try {
            const { boardId } = req.params;
            const { name } = req.body;
            console.log(boardId, name)
            await Board.update(boardId, name);
            res.status(200).json({ message: 'Board updated successfully' });
        } catch (error) {
            console.error('Error updating board:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req, res) {
        try {
            const { boardId } = req.params;
            await Board.delete(boardId);
            res.status(200).json({ message: 'Board deleted successfully' });
        } catch (error) {
            console.error('Error deleting board:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new BoardController();
