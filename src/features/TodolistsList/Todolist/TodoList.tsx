import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task';
import {TaskStatuses} from '../../../api/todolists-api';
import {FilterValuesType, TodolistsDomainType} from '../todolist-reducer';
import {fetchTasksTC, TasksDomainType} from '../task-reducer';
import {useAppDispatch} from '../../../app/hooks';
import {RequestStatusType} from '../../../app/app-reducer';


type PropsType = {
    todolist: TodolistsDomainType
    entityStatus: RequestStatusType
    tasks: Array<TasksDomainType>
    removeTask: (todolistID: string, id: string) => void
    changeTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistID: string, title: string) => void
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {


    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
           return
        }
        dispatch(fetchTasksTC(props.todolist.id));
    }, []);

    const onClickAllHandler = useCallback(() => props.changeTasks(props.todolist.id, 'all'), [props.todolist.id]);
    const onClickActiveHandler = useCallback(() => props.changeTasks(props.todolist.id, 'active'), [props.todolist.id]);
    const onClickCompletedHandler = useCallback(() => props.changeTasks(props.todolist.id, 'completed'), [props.todolist.id]);

    let tasksForTodolist = props.tasks;
    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    const onClickRemoveHandler = useCallback(() => props.removeTodolist(props.todolist.id), [props.todolist.id]);
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title);
    }, [props.addTask, props.todolist.id]);
    const updateTodolistTitleHandler = useCallback((title: string) => props.updateTodolistTitle(props.todolist.id, title), [props.todolist.id]);
    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChangeTitle={updateTodolistTitleHandler}
                              disabled={props.entityStatus === 'loading'}/>
                <IconButton onClick={onClickRemoveHandler} disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm
                    addItem={addTask} disabled={props.entityStatus === 'loading'}
                />
                <div>
                    {
                        tasksForTodolist.map(t => {
                            return <Task
                                disable={props.entityStatus === 'loading' || t.entityTaskStatus === 'loading'}
                                key={t.id}
                                task={t}
                                removeTask={props.removeTask}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                                todolistID={props.todolist.id}
                            />;
                        })
                    }
                </div>
            </div>
            <div>
                <Button color={'inherit'} variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onClickAllHandler}>All
                </Button>
                <Button color={'secondary'} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onClickActiveHandler}>Active
                </Button>
                <Button color={'error'} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onClickCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
});
