const express = require('express');
const app = express();
const boardsRouter = require('./routes/boardRoutes');
const tasksRouter = require('./routes/taskRouter');
const subtasksRouter = require('./routes/subtaskRouter');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const getAllBoardsAndTasks = require('./services/getAllBoards');

dotenv.config();
const cors = require('cors');

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/boards', boardsRouter);
app.use('/users', userRoutes);
app.use('/api/tasks', tasksRouter);
app.use('/api/subtasks', subtasksRouter);

// Corrected route handler
app.get('/api/boards', async (req, res) => {
    try {
        const boards = await getAllBoardsAndTasks();
        console.log(boards)
        res.json(boards);
    } catch (error) {
        console.error('error blyat',error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
