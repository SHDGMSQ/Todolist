import {v1} from 'uuid';
import {TaskStatuses, TaskType, TodoTaskPriorities} from '../api/todolists-api';
import {TaskStateType} from '../App';
import {addTodolistACType, removeTodolistACType} from './todolistReducer';


const initialState:TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState , action: GeneralType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].filter(f => f.id !== action.payload.id )}
        }
        case 'ADD-TASK' : {

            let newTask: TaskType = {id: v1(), title: action.payload.title, status: TaskStatuses.New, description: '',  todoListId: action.payload.todolistID, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''}
            return {...state, [action.payload.todolistID]:[newTask, ...state[action.payload.todolistID]]}
        }
        case 'UPDATE-TASK-TITLE': {

            let newTask = {id: v1(), title: action.payload.title, status: TaskStatuses.New, description: '',  todoListId: action.payload.todolistID, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''}
            return {...state, [action.payload.todolistID]:[newTask, ...state[action.payload.todolistID]]}
        }
        case 'CHANGE-STATUS': {

            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(m => m.id === action.payload.taskId ? {...m, status:action.payload.status } : m )}
        }
        case 'CHANGE-TASK-TITLE': {

            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].map(m => m.id === action.payload.taskId ? {...m, title: action.payload.title} : m )}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.newTodolistId]:[]}
        }
        case 'REMOVE-TODOLIST': {

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
export const changeStatusAC = (todolistID: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskId,
            status
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