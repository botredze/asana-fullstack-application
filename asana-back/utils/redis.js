
async function formatData(data) {
    const boards = {};
    data.forEach(row => {
        const { boardName, taskTitle, taskDescription, taskStatus } = row;
        if (!boards[boardName]) {
            boards[boardName] = { name: boardName, tasks: [] };
        }
        if (taskTitle) {
            boards[boardName].tasks.push({
                title: taskTitle,
                description: taskDescription,
                status: taskStatus,
                subtasks: []
            });
        }
    });
    return Object.values(boards);
}


module.require = formatData
