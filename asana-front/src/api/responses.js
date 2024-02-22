import axios from 'axios';
import {useBoardsStore} from "@/stores/boards";

const url = 'http://localhost:3000/'

export async function getBoards (){
    try {
        const result = await axios.get(`${url}api/boards`)
        return result.data
    }catch (error){
        console.log(error)
    }
}


export async function updateTask(taskId, taskData) {
    try {
        const result = await axios.put(`${url}api/tasks/${taskId}`, taskData)

        return result
    }catch (error){
        console.log(error)
    }
}


export async function updateTaskStatus(taskId, status) {
    try {
        const result = await axios.put(`${url}api/tasks/updateStatus/${taskId}`, {status: status})
        return result
    }catch (error){
        console.log(error)
    }
}

export async function updateStatusSubTask(subtaskId,isCompleted ){
    try {
        const result = await axios.put(`${url}api/subtasks/isComplete/${subtaskId}`, {isCompleted: isCompleted})
        return result
    }catch (error){
        console.log(error)
    }
}

export  async function creatBoard(boardName) {
    try {
        const result = await axios.post(`${url}boards/create/`, {name: boardName, userId: 1})
        return result
    }catch (error){
        console.log(error)
    }
}

export  async function deleteBoard(boardName) {
    try {
        const result = await axios.delete(`${url}boards/delete/${boardName}`)
        return result
    }catch (error){
        console.log(error)
    }
}
export  async function renameBoard(boardId, newName) {
    try {
        const result = await axios.put(`${url}boards/edit/${boardId}`, {name: newName})
        return result
    }catch (error){
        console.log(error)
    }
}

