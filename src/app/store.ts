import {taskReducer, TasksActionsType} from '../features/TodolistsList/task-reducer';
import {todolistReducer, TodolistsActionsType} from '../features/TodolistsList/todolist-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer, AppReducerActionsType} from './app-reducer';
import {authReducer, AuthReducerActionsType} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType = TodolistsActionsType | TasksActionsType | AppReducerActionsType | AuthReducerActionsType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;
