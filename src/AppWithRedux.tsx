import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {AddItemForm} from './Components/AddItemForm';
import {
    addTaskTC,
    changeStatusAC,
    changeTaskTitleAC,
    changeTaskTitleTC,
    removeTaskTC,
    updateTaskTitleAC,
} from './Reducers/taskReducer';
import {
    addTodolistTC,
    changeTasksAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistAC, removeTodolistTC,
    TodolistsDomainType,
    updateTodolistTitleAC, updateTodolistTitleTC
} from './Reducers/todolistReducer';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, []);

    const todolists = useSelector<AppRootStateType, Array<TodolistsDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();


    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskTC(todolistID, id));
    }, []);
    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title));
    }, [dispatch]);
    const changeTasks = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTasksAC(todolistID, value));
    }, []);
    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeStatusAC(todolistID, taskId, status));
    }, []);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID));
    }, []);
    const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleTC(todolistID, taskId, title));
    }, []);
    const updateTaskTitle = useCallback((todolistID: string, title: string) => {
        dispatch(updateTaskTitleAC(todolistID, title));
    }, []);
    const updateTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistID, title));
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);
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
                    <Button color="inherit">Login</Button>
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
                                    <Paper style={{padding: '10px'}}>
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
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
};

export default AppWithRedux;
