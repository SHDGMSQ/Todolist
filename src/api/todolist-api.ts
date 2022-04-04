import axios from 'axios';
import {TaskBodyType} from '../stories/todolists-api.stories';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b365fbe8-0446-4f2a-ad5f-3c9421879b5e'
    }
})


export const todolistApi = {

    getTodolists(){
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodolists(title: string){
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title} )
    },
    deleteTodolists(todolistId: string){
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolists(todolistId: string, title: string ){
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
}

export const tasksApi = {

    getTask(todolistId: string){
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<CommonResponseType<{item: TodoType}>>(`/todo-lists/${todolistId}/tasks`, {title} )
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, UpdateTaskModel: TaskBodyType ){
            return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, UpdateTaskModel);
    },
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

/*type CreateTodoResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {
        item: TodoType
    }
}*/

/*type DeleteAndUpdateTodoResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {
    }
}*/





