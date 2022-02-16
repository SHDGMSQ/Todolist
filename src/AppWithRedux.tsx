import React, {useCallback} from 'react';
import './App.css';
import { TaskType, TodoList } from "./TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import {
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
    updateTodolistTitleAC
} from "./Reducers/todolistReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]:Array<TaskType>
}

const AppWithRedux = () => {

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

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    /*let todolistID1 = v1();
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
    });*/

    const removeTask = useCallback ((todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }, [])
    const addTask = useCallback( (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])
    const changeTasks = useCallback ((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTasksAC(todolistID, value))
    }, [])
    const changeStatus = useCallback ((todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistID, taskId, isDone))
    }, [])
    const removeTodolist = useCallback ((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [])
    const changeTaskTitle = useCallback ((todolistID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, title))
    }, [])
    const updateTaskTitle = useCallback ((todolistID: string, title: string) => {
        dispatch(updateTaskTitleAC(todolistID, title))
    }, [])
    const updateTodolistTitle = useCallback ((todolistID: string, title: string) => {
        dispatch(updateTodolistTitleAC(todolistID, title))
    }, [])
    const addTodolist = useCallback( (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
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

                        return (
                            <React.Fragment key={m.id}>
                            <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                    <TodoList
                                        key={m.id}
                                        title={m.title}
                                        tasks={tasks[m.id]}
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
                            </React.Fragment>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
