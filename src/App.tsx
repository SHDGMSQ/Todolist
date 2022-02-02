import React, {useReducer} from 'react';
import './App.css';
import TodoList,{ TaskType } from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {
    TaskReducer,
    removeTaskAC,
    addTaskAC,
    updateTaskTitleAC,
    changeStatusAC,
    changeTaskTitleAC,
} from "./Reducers/TaskReducer";
import {
    addTodolistAC,
    changeTasksAC,
    removeTodolistAC,
    TodolistReducer,
    updateTodolistTitleAC
} from "./Reducers/TodolistReducer";
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

const App = () => {

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

    let [todolists, todolistsDispatch] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(TaskReducer, {
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
        //setTasks({...tasks, [todolistID]:tasks[todolistID].filter( f => f.id !== id )})
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    const addTask = (todolistID: string, title: string) => {
        //let newTask = {id: v1(), title: title, isDone: false }
        //setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
        tasksDispatch(addTaskAC(todolistID, title))
    }
    const changeTasks = (todolistID: string, value: FilterValuesType) => {
        //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
        todolistsDispatch(changeTasksAC(todolistID, value))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId? {...m, isDone}: m )})
        tasksDispatch(changeStatusAC(todolistID, taskId, isDone))
    }
    const removeTodolist = (todolistID: string) => {
        //setTodolists(todolists.filter( f => f.id !== todolistID ))
        todolistsDispatch(removeTodolistAC(todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }
    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        //setTasks({...tasks, [todolistID]: tasks[todolistID].map( m => m.id === taskId? {...m, title} : m )})
        tasksDispatch(changeTaskTitleAC(todolistID, taskId, title))
    }
    const updateTaskTitle = (todolistID: string, title: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
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
        todolistsDispatch(addTodolistAC(title))
        tasksDispatch(addTodolistAC(title))
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

export default App;
