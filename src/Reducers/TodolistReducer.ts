import {FilterValuesType, TodolistsType} from "../App";



export const TodolistReducer = (state: Array<TodolistsType>, action: GeneralType) => {
    switch (action.type) {
        case 'CHANGE-TASKS': {
            //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
            return state.map( m => m.id === action.preload.todolistID ? {...m, filter:action.preload.value} : m)
        }
        case 'REMOVE-TODOLIST': {
            //setTodolists(todolists.filter( f => f.id !== todolistID ))
            return state.filter( f => f.id !== action.preload.todolistID )
        }
        case 'UPDATE-TODOLIST-TITLE': {
            //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
            return state.map( m => m.id === action.preload.todolistID ? {...m, title: action.preload.title} : m )
        }
        case 'ADD-TODOLIST': {
            //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
            //setTodolists([newTodolist, ...todolists])
            let newTodolist: TodolistsType = {id: action.preload.newTodolistId, title: action.preload.title, filter: 'all'}
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
        preload: {
            todolistID,
            value
        }
    } as const
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        preload: {
            todolistID
        }
    } as const
}

type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        preload: {
            todolistID,
            title
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        preload: {
            title,
            newTodolistId
        }
    } as const
}
