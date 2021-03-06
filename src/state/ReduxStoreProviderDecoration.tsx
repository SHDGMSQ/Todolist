import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import {v1} from 'uuid';
import {taskReducer} from '../features/TodolistsList/task-reducer';
import {todolistReducer} from '../features/TodolistsList/todolist-reducer';
import {TaskStatuses, TodoTaskPriorities} from '../api/todolists-api';
import {AppRootStateType} from '../app/store';
import {appReducer} from '../app/app-reducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer
});

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        app: {
            error: null,
            status: 'idle'
        }
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};