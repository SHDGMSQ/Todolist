import {v1} from "uuid";



export const TaskReducer = (state: { [x: string]: { id: string; title: string; isDone: boolean; }[]; } , action: GeneralType): { [x: string]: { id: string; title: string; isDone: boolean; }[]; } => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].filter( f => f.id !== id )})
            return {...state, [action.preload.todolistID]:state[action.preload.todolistID].filter( f => f.id !== action.preload.id )}
        }
        case 'ADD-TASK' : {
            //let newTask = {id: v1(), title: title, isDone: false }
            //setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
            let newTask = {id: v1(), title: action.preload.title, isDone: false}
            return {...state, [action.preload.todolistID]:[newTask, ...state[action.preload.todolistID]]}
        }
        case 'UPDATE-TASK-TITLE': {
            //let newTask: TaskType = {id: v1(), title, isDone:false}
            //setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})
            let newTask = {id: v1(), title: action.preload.title, isDone: false}
            return {...state, [action.preload.todolistID]:[newTask, ...state[action.preload.todolistID]]}
        }
        case 'CHANGE-STATUS': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId? {...m, isDone}: m )})
            return {...state, [action.preload.todolistID]:state[action.preload.todolistID].map( m => m.id === action.preload.taskId ? {...m, isDone:action.preload.isDone } : m )}
        }
        case 'CHANGE-TASK-TITLE': {
            //setTasks({...tasks, [todolistID]: tasks[todolistID].map( m => m.id === taskId? {...m, title} : m )})
            return {...state, [action.preload.todolistID]:state[action.preload.todolistID].map( m => m.id === action.preload.taskId ? {...m, title: action.preload.title} : m )}
        }
        case 'ADD-EMPTY-TASKS': {
            //setTasks({...tasks, [newTodolist.id]:[]})
            return {...state, [action.preload.newTodolistId]:[]}
        }
        default: return state
    }
}
type GeneralType = removeTaskACType
| addTaskACType
| updateTaskTitleACType
| changeStatusACType
| changeTaskTitleACType
| addEmptyTasksACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        preload: {
            todolistID,
            id
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        preload: {
            todolistID,
            title
        }
    } as const
}

type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        preload: {
            todolistID,
            title
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        preload: {
            todolistID,
            taskId,
            isDone
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        preload: {
            todolistID,
            taskId,
            title
        }
    } as const
}

type addEmptyTasksACType = ReturnType<typeof addEmptyTasksAC>
export const addEmptyTasksAC = (newTodolistId: string) => {
    return {
        type: 'ADD-EMPTY-TASKS',
        preload: {
            newTodolistId
        }
    } as const
}