import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities, UpdateTaskModelType} from '../../api/todolists-api';
import {TaskStateType} from '../../trash/App';
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from './todolist-reducer';
import {AppRootStateType, AppThunk} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: TaskStateType = {};

//need to fix tests, task, stories and login

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)};
        case 'ADD-TASK' :
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, ...action.model} : m)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};

        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistID];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks};
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {...state, [action.todolistID]: state[action.todolistID].map( m => m.id === action.taskId ? {...m, entityStatus: action.entityStatus} : m )}
        default:
            return state;
    }
};

//actions
export const removeTaskAC = (todolistID: string, id: string) =>
    ({type: 'REMOVE-TASK', todolistID, id} as const);
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const);
export const updateTaskAC = (todolistID: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistID, taskId, model}) as const;
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId}) as const;
export const changeTaskEntityStatusAC = (todolistID: string, taskId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    todolistID,
    taskId,
    entityStatus
} as const);

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message);
        });
};
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message);
        });
};
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message);
        });
};
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'));

        const state = getState();
        const task = state.tasks[todolistId].find(f => f.id === taskId);
        if (!task) {
            return;
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            ...domainModel
        };
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(res.data.data.item.todoListId, res.data.data.item.id, domainModel));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message);
            });
    };

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string | null
    deadline?: string | null
}
export type TasksDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType
    | ReturnType<typeof changeTaskEntityStatusAC>

