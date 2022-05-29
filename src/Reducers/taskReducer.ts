import {v1} from 'uuid';
import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities} from '../api/todolists-api';
import {TaskStateType} from '../App';
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from './todolistReducer';
import {Dispatch} from 'redux';


const initialState:TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState , action: GeneralType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]:state[action.payload.todolistID].filter(f => f.id !== action.payload.id )}
        }
        case 'ADD-TASK' : {

            let newTask: TaskType = action.payload.task
            return {...state, [action.payload.task.todoListId]:[newTask, ...state[action.payload.task.todoListId]]}
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
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach( tl => {
                copyState[tl.id] = []
            } )
          return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId] = action.payload.tasks}
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
| setTodolistsACType
| setTasksACType

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
export const addTaskAC = (task: TaskType, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task,
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

type setTasksACType = {type: 'SET-TASKS', payload: {tasks: Array<TaskType>,todolistId: string}}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks,
            todolistId
        }
    } as const
}


export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId));
            });
    };
};

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then( res => {
                dispatch(removeTaskAC(todolistId, taskId))
            } )
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item, title))
            })
    }
}
