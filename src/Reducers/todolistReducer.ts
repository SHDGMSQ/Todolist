import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

const initialState: Array<TodolistsDomainType> = [];

export const todolistReducer = (state: Array<TodolistsDomainType> = initialState, action: ActionsType): Array<TodolistsDomainType> => {
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
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
        });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item));
        });
};
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId));
        });
};
export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(updateTodolistTitleAC(todolistId, title));
        });
};

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsDomainType = TodolistType & { filter: FilterValuesType }
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | ReturnType<typeof changeTasksAC>
    | removeTodolistACType
    | ReturnType<typeof updateTodolistTitleAC>
    | addTodolistACType
    | setTodolistsACType