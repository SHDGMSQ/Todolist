import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b365fbe8-0446-4f2a-ad5f-3c9421879b5e'
    }
};


type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: [],
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    data: {},
    messages: []
    fieldsErrors: [],
    resultCode: number
}


type DeleteTodolistResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}


export const todolistsAPI = {
    getTodolists() {
        return axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
    },
    createTodolist() {
        return axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'NEW TODO1111'}, settings);
    },
    updateTodolist(todolistId: string, title: string) {
        return axios.put<UpdateTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings);
    },
    deleteTodolist(todolistId: string) {
        return axios.delete<DeleteTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings);
    },
};