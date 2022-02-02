import { TaskStateType, TodolistsType } from "../App";
import {addTodolistAC, TodolistReducer} from "./TodolistReducer";
import {TaskReducer} from "./TaskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.preload.newTodolistId);
    expect(idFromTodolists).toBe(action.preload.newTodolistId);
});
