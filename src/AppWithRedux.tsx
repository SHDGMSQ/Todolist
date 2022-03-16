import React, { useCallback } from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
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
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask = (todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }
    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch, addTaskAC])
    const changeTasks = (todolistID: string, value: FilterValuesType) => {
        dispatch(changeTasksAC(todolistID, value))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistID, taskId, isDone))
    }
    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }
    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, title))
    }
    const updateTaskTitle = (todolistID: string, title: string) => {
        dispatch(updateTaskTitleAC(todolistID, title))
    }
    const updateTodolistTitle = (todolistID: string, title: string) => {
        dispatch(updateTodolistTitleAC(todolistID, title))
    }
    const addTodolist = useCallback((title: string) => {
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

                        let tasksForTodolist = tasks[m.id]
                        if (m.filter === 'active')
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === false)
                        if (m.filter === 'completed')
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === true)

                        return (
                            <React.Fragment key={m.id}>
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={m.id}
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
                            </React.Fragment>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
