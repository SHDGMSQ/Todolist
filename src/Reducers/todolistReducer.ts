import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialState: Array<TodolistsDomainType> = [];
export const todolistReducer = (state: Array<TodolistsDomainType> = initialState, action: GeneralType): Array<TodolistsDomainType> => {
    switch (action.type) {
        case 'CHANGE-TASKS': {
            //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
            return state.map(m => m.id === action.payload.todolistID ? {...m, filter: action.payload.value} : m);
        }
        case 'REMOVE-TODOLIST': {
            //setTodolists(todolists.filter( f => f.id !== todolistID ))
            return state.filter(f => f.id !== action.payload.todolistID);
        }
        case 'UPDATE-TODOLIST-TITLE': {
            //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
            return state.map(m => m.id === action.payload.todolistID ? {...m, title: action.payload.title} : m);
        }
        case 'ADD-TODOLIST': {
            //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
            //setTodolists([newTodolist, ...todolists])
            let newTodolist: TodolistsDomainType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            };
            return [newTodolist, ...state];
        }
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(m => {
                return {...m, filter: 'all'};
            });
        }
        default:
            return state;
    }
};

type GeneralType = changeTasksACType
    | removeTodolistACType
    | updateTodolistTitleACType
    | addTodolistACType
    | setTodolistsACType

type changeTasksACType = ReturnType<typeof changeTasksAC>
export const changeTasksAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TASKS',
        payload: {
            todolistID,
            value
        }
    } as const;
};

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const;
};

type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistID,
            title
        }
    } as const;
};

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId: v1()
        }
    } as const;
};

export type setTodolistsACType = {
    type: 'SET-TODOLISTS',
    payload: {
        todolists: Array<TodolistType>
    }
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const;
};


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data));
            });
    };
};
