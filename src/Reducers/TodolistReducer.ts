import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const TodolistReducer = (state: Array<TodolistsType>, action: GeneralType): Array<TodolistsType> => {
    switch (action.type) {
        case 'CHANGE-TASKS': {
            //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
            return state.map( m => m.id === action.payload.todolistID ? {...m, filter:action.payload.value} : m)
        }
        case 'REMOVE-TODOLIST': {
            //setTodolists(todolists.filter( f => f.id !== todolistID ))
            return state.filter( f => f.id !== action.payload.todolistID )
        }
        case 'UPDATE-TODOLIST-TITLE': {
            //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
            return state.map( m => m.id === action.payload.todolistID ? {...m, title: action.payload.title} : m )
        }
        case 'ADD-TODOLIST': {
            //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
            //setTodolists([newTodolist, ...todolists])
            let newTodolist: TodolistsType = {id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        default: return state
    }
}

type GeneralType = changeTasksACType
| removeTodolistACType
| updateTodolistTitleACType
| addTodolistACType

type changeTasksACType = ReturnType<typeof changeTasksAC>
export const changeTasksAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TASKS',
        payload: {
            todolistID,
            value
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistID,
            title
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId: v1()
        }
    } as const
}
