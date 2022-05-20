import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b365fbe8-0446-4f2a-ad5f-3c9421879b5e'
    }
};

export const todolistsAPI = {
    getTodolists () {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist () {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'NEW TODO1111'}, settings)
    },
    updateTodolist (todolistId: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'ewrfwfwef'}, settings)
    },
    deleteTodolist (todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
}