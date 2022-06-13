import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';

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
            return [{...action.todolist, filter: 'all'}, ...state];
        case 'SET-TODOLISTS':
            return action.todolists.map(m => {
                return {...m, filter: 'all'};
            });
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

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'))
        });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'))
        });
};
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId));
            dispatch(setAppStatusAC('succeeded'))
        });
};
export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(updateTodolistTitleAC(todolistId, title));
            dispatch(setAppStatusAC('succeeded'))
        });
};

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsDomainType = TodolistType & { filter: FilterValuesType }
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionsType =
    | ReturnType<typeof changeTasksAC>
    | removeTodolistACType
    | ReturnType<typeof updateTodolistTitleAC>
    | addTodolistACType
    | setTodolistsACType