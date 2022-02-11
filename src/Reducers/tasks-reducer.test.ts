
import {TaskStateType} from "../App";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
import {removeTodolistAC} from "./todolistReducer";


let startState: TaskStateType;



beforeEach( () => {
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
} )

//test for REMOVE-TASK
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2" );

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

//test for ADD-TASK
test('correct task should be added to correct array', () => {


    const action = addTaskAC('todolistId2', 'juce');

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

//test for CHANGE-STATUS
test('status of specified task should be changed', () => {


    const action = changeStatusAC("todolistId2", "2", false );

    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});

//test for CHANGE-TASK-TITLE
test('text of task should be changed', () => {


    const action = changeTaskTitleAC("todolistId2", "2", 'NewTitle' );

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



