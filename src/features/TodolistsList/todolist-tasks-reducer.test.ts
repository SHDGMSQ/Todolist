import { TaskStateType } from "../../trash/App";
import {addTodolistAC, todolistReducer, TodolistsDomainType} from './todolist-reducer';
import {taskReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsDomainType> = [];

    const action = addTodolistAC({
        id: 'exist',
        order: 0,
        title: 'new todolist',
        addedDate: ''
    });

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBeDefined();
    expect(idFromTodolists).toBeDefined();
});
