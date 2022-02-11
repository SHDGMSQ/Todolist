import {v1} from "uuid";
import {TaskStateType} from "../App";
import {TaskType} from "../TodoList";
import { addTodolistACType, removeTodolistACType } from "./todolistReducer";


const initialState:TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState , action: GeneralType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].filter( f => f.id !== id )})
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].filter(f => f.id !== action.payload.id )}
        }
        case 'ADD-TASK' : {
            //let newTask = {id: v1(), title: title, isDone: false }
            //setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]:[newTask, ...state[action.payload.todolistID]]}
        }
        case 'UPDATE-TASK-TITLE': {
            //let newTask: TaskType = {id: v1(), title, isDone:false}
            //setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]:[newTask, ...state[action.payload.todolistID]]}
        }
        case 'CHANGE-STATUS': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId? {...m, isDone}: m )})
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(m => m.id === action.payload.taskId ? {...m, isDone:action.payload.isDone } : m )}
        }
        case 'CHANGE-TASK-TITLE': {
            //setTasks({...tasks, [todolistID]: tasks[todolistID].map( m => m.id === taskId? {...m, title} : m )})
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(m => m.id === action.payload.taskId ? {...m, title: action.payload.title} : m )}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.newTodolistId]:[]}
        }
        case 'REMOVE-TODOLIST': {
            //delete tasks[todolistID]
            const copyState = {...state};
            delete copyState[action.payload.todolistID]
            return copyState
        }
        default: return state
    }
}
type GeneralType = removeTaskACType
| addTaskACType
| updateTaskTitleACType
| changeStatusACType
| changeTaskTitleACType
| addTodolistACType
| removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            id
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    } as const
}

type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todolistID,
            title
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskId,
            isDone
        }
    } as const
}

type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistID: string,
        taskId: string,
        title: string
    }
}
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            taskId,
            title
        }
    } as const

}