import React, {useReducer} from 'react';
import './App.css';
import { TodoList } from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {
    taskReducer,
    removeTaskAC,
    addTaskAC,
    updateTaskTitleAC,
    changeStatusAC,
    changeTaskTitleAC,
} from "./Reducers/taskReducer";
import {
    addTodolistAC,
    changeTasksAC, FilterValuesType,
    removeTodolistAC,
    todolistReducer,
    updateTodolistTitleAC
} from './Reducers/todolistReducer';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TaskStatuses, TaskType, TodoTaskPriorities } from './api/todolists-api';


//new init commit



export type TaskStateType = {
    [key: string]:Array<TaskType>
}

const App = () => {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, tasksDispatch] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: '',  todoListId: todolistID1, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, description: '',  todoListId: todolistID1, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, description: '',  todoListId: todolistID1, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "Rest API", status: TaskStatuses.New, description: '',  todoListId: todolistID1, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "GraphQL", status: TaskStatuses.New, description: '',  todoListId: todolistID1, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", status: TaskStatuses.Completed, description: '',  todoListId: todolistID2, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "JS2", status: TaskStatuses.Completed, description: '',  todoListId: todolistID2, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "ReactJS2", status: TaskStatuses.New, description: '',  todoListId: todolistID2, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "Rest API2", status: TaskStatuses.New, description: '',  todoListId: todolistID2, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "GraphQL2", status: TaskStatuses.New, description: '',  todoListId: todolistID2, order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
        ]
    });

    const removeTask = (todolistID: string, id: string) => {
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    const addTask = (todolistID: string, title: string) => {
        
        tasksDispatch(addTaskAC({
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
        }, title))
    }
    const changeTasks = (todolistID: string, value: FilterValuesType) => {
        //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
        todolistsDispatch(changeTasksAC(todolistID, value))
    }
    const changeStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {

        tasksDispatch(changeStatusAC(todolistID, taskId, status))
    }
    const removeTodolist = (todolistID: string) => {
        //setTodolists(todolists.filter( f => f.id !== todolistID ))
        const action = removeTodolistAC(todolistID)
        todolistsDispatch(action)
        tasksDispatch(action)
        //delete tasks[todolistID]
        //console.log(tasks)
    }
    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        //setTasks({...tasks, [todolistID]: tasks[todolistID].map( m => m.id === taskId? {...m, title} : m )})
        tasksDispatch(changeTaskTitleAC(todolistID, taskId, title))
    }
    const updateTaskTitle = (todolistID: string, title: string) => {
        //let newTask: TaskType = {id: v1(), title, isDone: false}
        //setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})
        tasksDispatch(updateTaskTitleAC(todolistID, title))
    }
    const updateTodolistTitle = (todolistID: string, title: string) => {
        //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
        todolistsDispatch(updateTodolistTitleAC(todolistID, title))
    }
    const addTodolist = (title: string) => {
        //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        //setTodolists([newTodolist, ...todolists])
        //setTasks({...tasks, [newTodolist.id]:[]})
        const action = addTodolistAC(title)
        todolistsDispatch(action)
        tasksDispatch(action)
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(m => {
                        let tasksForTodolist = tasks[m.id]
                        if (m.filter === 'active')
                            tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.New)
                        if (m.filter === 'completed')
                            tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.Completed)
                        return (
                            <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                <TodoList
                                    title={m.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeTasks={changeTasks}
                                    addTask={addTask}
                                    todolistID={m.id}
                                    filter={m.filter}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    updateTaskTitle={updateTaskTitle}
                                    updateTodolistTitle={updateTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
