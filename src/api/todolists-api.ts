import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b365fbe8-0446-4f2a-ad5f-3c9421879b5e'
    }
});

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[],
    data: D
}

type TasksType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    addedDate: string
}

type ResponseTasksType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}


export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseTasksType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string){
        return instance.put<ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
};