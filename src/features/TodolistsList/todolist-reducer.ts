import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState: Array<TodolistsDomainType> = [];

export const todolistReducer = (state: Array<TodolistsDomainType> = initialState, action: TodolistsActionsType): Array<TodolistsDomainType> => {
    switch (action.type) {
        case 'CHANGE-TASKS':
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m);
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.todolistID);
        case 'UPDATE-TODOLIST-TITLE':
            return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case 'SET-TODOLISTS':
            return action.todolists.map(m => {
                return {...m, filter: 'all', entityStatus: 'idle'};
            });
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(m => m.id === action.id ? {...m, entityStatus: action.entityStatus} : m);
        default:
            return state;
    }
};

//actions
export const changeTasksAC = (todolistID: string, value: FilterValuesType) =>
    ({type: 'CHANGE-TASKS', todolistID, value}) as const;
export const removeTodolistAC = (todolistID: string) =>
    ({type: 'REMOVE-TODOLIST', todolistID}) as const;
export const updateTodolistTitleAC = (todolistID: string, title: string) =>
    ({type: 'UPDATE-TODOLIST-TITLE', todolistID, title}) as const;
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists}) as const;
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const);

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        });
};
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        });
};
export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTodolistTitleAC(todolistId, title));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        });
};

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionsType =
    | ReturnType<typeof changeTasksAC>
    | removeTodolistACType
    | ReturnType<typeof updateTodolistTitleAC>
    | addTodolistACType
    | setTodolistsACType
    | ReturnType<typeof changeTodolistEntityStatusAC>