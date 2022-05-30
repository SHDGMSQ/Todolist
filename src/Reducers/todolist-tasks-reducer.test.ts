import { TaskStateType } from "../App";
import {addTodolistAC, todolistReducer, TodolistsDomainType} from './todolistReducer';
import {taskReducer} from "./taskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsDomainType> = [];

    const action = addTodolistAC({
        id: 'exist',
        order: 0,
        title: 'new todolist',
        addedDate: ''
    }, 'newTodo');

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBeDefined();
    expect(idFromTodolists).toBeDefined();
});
