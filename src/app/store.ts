import {taskReducer} from "../features/TodolistsList/task-reducer";
import {todolistReducer} from "../features/TodolistsList/todolist-reducer";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
