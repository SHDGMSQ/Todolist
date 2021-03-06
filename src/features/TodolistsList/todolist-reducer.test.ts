import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTasksAC, changeTodolistEntityStatusAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistReducer,
    TodolistsDomainType,
    updateTodolistTitleAC
} from './todolist-reducer';
import {RequestStatusType} from '../../app/app-reducer';


let todolistID1: string
let todolistID2: string
let startState: Array<TodolistsDomainType>

beforeEach( () => {
     todolistID1 = v1();
     todolistID2 = v1();

     startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
} )

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

    const endState = todolistReducer(startState, addTodolistAC({
        id: '',
        order: 0,
        title: 'NewTodolist',
        addedDate: ''
    }))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})
//test for SET-TODOLISTS
test('todolists should be add to state', () => {

    const endState = todolistReducer([], setTodolistsAC(startState))
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
})

//test for CHANGE-TODOLIST-ENTITY_STATUS
test('correct entity status of todolist should be changed', () => {

    const newStatus: RequestStatusType = 'loading'

    const endState = todolistReducer(startState, changeTodolistEntityStatusAC(todolistID2, newStatus))
    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})



