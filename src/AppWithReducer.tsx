import React, {useReducer} from 'react';
import './App.css';
import { TaskType, TodoList } from "./TodoList";
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
    changeTasksAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistTitleAC
} from "./Reducers/todolistReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]:Array<TaskType>
}

const AppWithReducer = () => {

    //init commit
    //with reducers
    /*
        let [filter, setFilter] = useState<FilterValuesType>('all')

        let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACTJS", isDone: false},
            {id: v1(), title: "restIP", isDone: true},
            {id: v1(), title: "graphQL", isDone: false},
        ])
    */

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistID: string, id: string) => {
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    const addTask = (todolistID: string, title: string) => {
        tasksDispatch(addTaskAC(todolistID, title))
    }
    const changeTasks = (todolistID: string, value: FilterValuesType) => {
        todolistsDispatch(changeTasksAC(todolistID, value))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        tasksDispatch(changeStatusAC(todolistID, taskId, isDone))
    }
    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        todolistsDispatch(action)
        tasksDispatch(action)

    }
    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        tasksDispatch(changeTaskTitleAC(todolistID, taskId, title))
    }
    const updateTaskTitle = (todolistID: string, title: string) => {
        tasksDispatch(updateTaskTitleAC(todolistID, title))
    }
    const updateTodolistTitle = (todolistID: string, title: string) => {
        todolistsDispatch(updateTodolistTitleAC(todolistID, title))
    }
    const addTodolist = (title: string) => {
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
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === false)
                        if (m.filter === 'completed')
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === true)
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

export default AppWithReducer;
