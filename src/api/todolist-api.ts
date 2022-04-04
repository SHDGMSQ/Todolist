import axios from 'axios';


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





