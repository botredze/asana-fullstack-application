const db = require('../config/dbConfig');

async function getAllBoardsAndTasks(req, res) {
    try {
        const query = `
            SELECT Boards.Name AS boardName,
                   Boards.BoardId AS boardId,
                   Tasks.TaskId AS taskId,
                   Tasks.Title AS taskTitle,
                   Tasks.Description AS taskDescription,
                   Tasks.Status AS taskStatus,
                   Subtasks.Title AS subtaskTitle,
                   Subtasks.SubtaskId AS subtaskId,
                   Subtasks.IsCompleted AS subtaskIsCompleted
            FROM Boards
                     LEFT JOIN Tasks ON Boards.BoardId = Tasks.BoardId
                     LEFT JOIN Subtasks ON Tasks.TaskId = Subtasks.TaskId;

        `;

        const results = await db.query(query);
        const boards = {};

        results.forEach(row => {
            const {taskId, boardName, taskTitle, taskDescription, taskStatus, subtaskTitle, subtaskIsCompleted, subtaskId, boardId} = row;

            if (!boards[boardName]) {
                boards[boardName] = { id: boardId, name: boardName, columns: [] };
            }

            const existingColumn = boards[boardName].columns.find(column => column.name === taskStatus);

            if (!existingColumn) {
                boards[boardName].columns.push({
                    name: taskStatus,
                    tasks: []
                });
            }

            boards[boardName].columns.forEach(column => {
                if (column.name === taskStatus) {
                    const existingTask = column.tasks.find(task => task.title === taskTitle);

                    if (!existingTask) {
                        column.tasks.push({
                            id: taskId,
                            title: taskTitle,
                            description: taskDescription,
                            status: taskStatus,
                            subtasks: []
                        });
                    }

                    if (subtaskTitle && existingTask) {
                        existingTask.subtasks.push({
                            id: subtaskId,
                            title: subtaskTitle,
                            isCompleted: subtaskIsCompleted
                        });
                    }
                }
            });
        });

        const formattedData = { boards: Object.values(boards) };

        return formattedData;
    } catch (error) {
        throw error;
    }
}

module.exports = getAllBoardsAndTasks;
