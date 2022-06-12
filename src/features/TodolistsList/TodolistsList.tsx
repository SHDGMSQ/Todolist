import {
    addTodolistTC,
    changeTasksAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistsDomainType, updateTodolistTitleTC
} from './todolist-reducer';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {addTaskTC, removeTaskTC, updateTaskTC} from './task-reducer';
import {TaskStatuses, TaskType} from '../../api/todolists-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {TodoList} from './Todolist/TodoList';



export const TodolistsList: React.FC<TodolistPropsType> = (props) => {

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
        dispatch(updateTaskTC(todolistID, taskId, {status}));
    }, []);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID));
    }, []);
    const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistID, taskId, {title}));
    }, []);

    const updateTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistID, title));
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    return <>

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
                                    updateTodolistTitle={updateTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    </React.Fragment>
                );
            })}
        </Grid>
    </>
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
type TodolistPropsType = {
}