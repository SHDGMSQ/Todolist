import {v1} from "uuid";
import {
    addTodolistAC,
    changeTasksAC,
    removeTodolistAC,
    todolistReducer, TodolistsDomainType,
    updateTodolistTitleAC
} from './todolistReducer';


let todolistID1: string
let todolistID2: string
let startState: Array<TodolistsDomainType>

beforeEach( () => {
     todolistID1 = v1();
     todolistID2 = v1();

     startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]
} )

//TESTS FOR TODOLIST_REDUCER
//test for CHANGE-TASKS
test('correct task should be changed', () => {

    const endState = todolistReducer(startState, changeTasksAC(todolistID1, 'completed'))
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
})

//test for REMOVE-TODOLIST
test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2)

    const endState1 = todolistReducer(startState, removeTodolistAC(todolistID2))
    expect(endState1.length).toBe(1);
    expect(endState1[0].id).toBe(todolistID1)
})

//test for UPDATE-TODOLIST-TITLE
test('correct todolist title should be update', () => {

    let newTitle = 'NewTodolistTitle'
    const endState = todolistReducer(startState, updateTodolistTitleAC(todolistID1, newTitle))

    expect(endState[0].title).toBe('NewTodolistTitle')
    expect(endState[1].title).toBe('What to buy')
})

//test for ADD-TODOLIST
test('correct todolist should be add', () => {
    //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
    //setTodolists([newTodolist, ...todolists])
    let newTitle = "NewTodolist"

    const endState = todolistReducer(startState, addTodolistAC(newTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})




