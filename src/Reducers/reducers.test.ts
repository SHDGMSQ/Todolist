import {v1} from "uuid";
import {TodolistsType} from "../App";
import {
    addTodolistAC,
    changeTasksAC,
    removeTodolistAC,
    TodolistReducer,
    updateTodolistTitleAC
} from "./TodolistReducer";
import {removeTaskAC, TaskReducer} from "./TaskReducer";

//TESTS FOR TODOLIST_REDUCER
//test for CHANGE-TASKS
test('correct task should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = TodolistReducer(startState, changeTasksAC(todolistID1, 'completed'))
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
})

//test for REMOVE-TODOLIST
test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = TodolistReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2)

    const endState1 = TodolistReducer(startState, removeTodolistAC(todolistID2))
    expect(endState1.length).toBe(1);
    expect(endState1[0].id).toBe(todolistID1)
})

//test for UPDATE-TODOLIST-TITLE
test('correct todolist title should be update', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTitle = 'NewTodolistTitle'
    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = TodolistReducer(startState, updateTodolistTitleAC(todolistID1, newTitle))

    expect(endState[0].title).toBe('NewTodolistTitle')
    expect(endState[1].title).toBe('What to buy')
})

//test for ADD-TODOLIST
test('correct todolist should be add', () => {
    //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
    //setTodolists([newTodolist, ...todolists])
    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTitle = "NewTodolist"
    let newTodolistId = v1()
    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = TodolistReducer(startState, addTodolistAC(newTitle, newTodolistId))
    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(newTodolistId)
    expect(endState[0].title).toBe(newTitle)
})

//TESTS FOR TASK_REDUCER
