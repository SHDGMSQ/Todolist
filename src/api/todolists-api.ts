import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b365fbe8-0446-4f2a-ad5f-3c9421879b5e'
    }
});

//api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{ item: TodolistType }>>, {title: string}>('todo-lists', {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<any, AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{item: TaskType}>>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<any, AxiosResponse<ResponseType<{item: TaskType}>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    }
};

export const AuthAPI = {
    login(data: LoginParamsType) {
        return instance.post<any, AxiosResponse<ResponseType<{userId: number}>>, LoginParamsType>('auth/login', data)
    }
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export const enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export const enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string | null
    deadline: string | null
    addedDate: string
}
type ResponseTaskType<D = {}> = {
    items: TaskType[]
    totalCount: number
    error: string | null
    data: D
}
export type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[],
    resultCode: number
}
export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string | null
    deadline: string | null
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}
