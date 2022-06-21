import {TaskStatuses, TodoTaskPriorities} from '../../api/todolists-api';
import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    taskReducer,
    TasksDomainType,
    updateTaskAC
} from './task-reducer';
import {removeTodolistAC, setTodolistsAC} from './todolist-reducer';
import {RequestStatusType} from '../../app/app-reducer';


let startState: {[key: string]: Array<TasksDomainType>};


beforeEach( () => {
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, description: '',  todoListId: "todolistId1", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, description: '',  todoListId: "todolistId1", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "3", title: "React", status: TaskStatuses.New, description: '',  todoListId: "todolistId1", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, description: '',  todoListId: "todolistId2", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "2", title: "milk", status: TaskStatuses.Completed, description: '',  todoListId: "todolistId2", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "3", title: "tea", status: TaskStatuses.New, description: '',  todoListId: "todolistId2", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' }
        ]
    };
} )

//test for REMOVE-TASK
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "1" );

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, description: '',  todoListId: "todolistId1", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, description: '',  todoListId: "todolistId1", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "3", title: "React", status: TaskStatuses.New, description: '',  todoListId: "todolistId1", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' }
        ],
        "todolistId2": [
            { id: "2", title: "milk", status: TaskStatuses.Completed, description: '',  todoListId: "todolistId2", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' },
            { id: "3", title: "tea", status: TaskStatuses.New, description: '',  todoListId: "todolistId2", order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '', entityTaskStatus: 'idle' }
        ]
    });

});

//test for ADD-TASK
test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: 'exist',
        status: TaskStatuses.New,
        description: '',
        todoListId: 'todolistId2',
        title: 'juce',
        deadline: '',
        priority: 0,
        order: 0,
        addedDate: '',
        startDate: ''
    });

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

//test for CHANGE-STATUS
test('status of specified task should be changed', () => {


    const action = updateTaskAC("todolistId2", "2", {status: TaskStatuses.New} );

    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

//test for CHANGE-TASK-TITLE
test('text of task should be changed', () => {


    const action = updateTaskAC("todolistId2", "2", {title: 'NewTitle'} );

    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('NewTitle');
    expect(endState["todolistId1"][1].title).toBe('JS');
});

//test for REMOVE-TASKS WITH TODOLIST
test('property with todolistId should be deleted', () => {


    const action = removeTodolistAC("todolistId2");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

//test for set empty array for tasks when added TODOS
test('empty arrays should be added with todos', () => {

     const startTodo = [{id: '1', order: 0, addedDate: '', title: 'todos'}]

    const action = setTodolistsAC(startTodo);
    const id = '1'
    const endState = taskReducer({}, action)


    expect(endState[id]).toStrictEqual([]);

});

//test for SET-TASKS
test('tasks should be added', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1");

    const endState = taskReducer({}, action)

    expect(endState["todolistId1"].length).toBe(3);
})

//test for CHANGE-TASK-ENTITY_STATUS
test('correct entity status of task should be changed', () => {

    const newStatus: RequestStatusType = 'loading'

    const endState = taskReducer(startState, changeTaskEntityStatusAC("todolistId2", '2', newStatus))

    expect(endState["todolistId1"][1].entityTaskStatus).toBe('idle')
    expect(endState["todolistId2"][1].entityTaskStatus).toBe('loading')
})

