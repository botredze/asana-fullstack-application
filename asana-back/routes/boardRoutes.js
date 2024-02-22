const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.post('/create', boardController.create);

router.get('/', boardController.getAll);

router.get('/:userId', boardController.getByUserId);

router.put('/edit/:boardId', boardController.update);

router.delete('/delete/:boardId', boardController.delete);

module.exports = router;
