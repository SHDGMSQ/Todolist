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

            return state.filter(f => f.id !== action.payload.todolistID);
        }
        case 'UPDATE-TODOLIST-TITLE': {
            //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
            return state.map(m => m.id === action.payload.todolistID ? {...m, title: action.payload.title} : m);
        }
        case 'ADD-TODOLIST': {

            const newTodolist: TodolistsDomainType = {...action.payload.todolist, filter: 'all'}
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
export const addTodolistAC = (todolist: TodolistType ) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
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

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(updateTodolistTitleAC(todolistId, title))
            })
    }
}
