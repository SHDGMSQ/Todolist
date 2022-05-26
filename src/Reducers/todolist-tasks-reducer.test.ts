import { TaskStateType } from "../App";
import {addTodolistAC, todolistReducer, TodolistsDomainType} from './todolistReducer';
import {taskReducer} from "./taskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsDomainType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newTodolistId);
    expect(idFromTodolists).toBe(action.payload.newTodolistId);
});
