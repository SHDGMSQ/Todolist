import {
    addTodolistTC,
    changeTasksAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    updateTodolistTitleTC
} from './todolist-reducer';
import React, {useCallback, useEffect} from 'react';
import {addTaskTC, removeTaskTC, updateTaskTC} from './task-reducer';
import {TaskStatuses, TaskType} from '../../api/todolists-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {TodoList} from './Todolist/TodoList';
import {useAppDispatch, useAppSelector} from '../../app/hooks';


export const TodolistsList: React.FC<TodolistPropsType> = ({demo = false}) => {

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodolistsTC());
        }
    }, []);

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch();


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
                                    todolist={m}
                                    entityStatus={m.entityStatus}
                                    key={m.id}
                                    tasks={tasks[m.id]}
                                    removeTask={removeTask}
                                    changeTasks={changeTasks}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle} updateTodolistTitle={updateTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    </React.Fragment>
                );
            })}
        </Grid>
    </>;
};

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
type TodolistPropsType = {
    demo?: boolean
}