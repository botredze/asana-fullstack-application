import { defineStore } from "pinia";
import axios from "axios";
import {creatBoard, deleteBoard, getBoards, renameBoard, updateTask, updateTaskStatus} from "@/api/responses";



export const useBoardsStore = defineStore({
    id: "boards",
    state: () => ({
        boards: [],
        selectedBoard: 0,
        selectedColumn: 0,
        selectedTask: 0,
    }),
    getters: {
        getColumns: (state) => state.boards[state.selectedBoard]?.columns,
        getCurrentBoard: (state) => state.boards[state.selectedBoard],
        getCurrentColumn: (state) =>
            state.boards[state.selectedBoard]?.columns[state.selectedColumn],
        getTask: (state) =>
            state.boards[state.selectedBoard]?.columns[state.selectedColumn]?.tasks[
                state.selectedTask
                ],
        getColumnsNames: (state) =>
            state.boards[state.selectedBoard]?.columns.map((c) => c.name),
    },
    actions: {
        async  getBoardsMount() {
            const jsonData = await getBoards()
            if(jsonData !== null) {
                this.boards = jsonData.boards;
            }
        },

        async updateTask({ taskId, taskData, column }) {
            try {
                console.log(taskId, taskData)
                await updateTask(taskId, taskData)
                await this.getBoardsMount();
                const column = this.getCurrentColumn;
                const taskIndex = column.tasks.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    column.tasks.splice(taskIndex, 1, taskData);
                }
            } catch (error) {
                console.error("Error updating task:", error);
            }
        },

        async updateTaskStatus({taskId, status, index}) {

            console.log(taskId, status)
            try {
                await updateTaskStatus(taskId, status);
                await this.getBoardsMount();
                 this.getCurrentBoard?.columns[index]?.tasks.push(this.getTask);
                 this.getCurrentColumn?.tasks.splice(this.selectedTask, 1);
                 this.selectedColumn = index;
                 this.selectedTask = this.getCurrentColumn?.tasks.length - 1;
            }catch (error) {
                console.error("Error updating task:", error);
            }
        },


        async deleteTask(taskId) {
            try {
                await axios.delete(`/api/tasks/${taskId}`);
                const board = this.getCurrentBoard;
                const column = this.getCurrentColumn;
                const taskIndex = column.tasks.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    column.tasks.splice(taskIndex, 1);
                }
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },

        async createBoard (boardName){
            try {
                await creatBoard(boardName)
                await this.getBoardsMount();
            }catch (error) {
                console.error("Error deleting task:", error);
            }
        },


        async deleteBoard (boardName){
            try {
                await deleteBoard(boardName)
                await this.getBoardsMount();
            }catch (error) {
                console.error("Error deleting task:", error);
            }
        },

        async renameBoard (boardId, boardName){
            try {
                await renameBoard( boardId,boardName)
                await this.getBoardsMount();
            }catch (error) {
                console.error("Error deleting task:", error);
            }
        },

    },
});
