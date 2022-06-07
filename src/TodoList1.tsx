import React, {ChangeEvent} from 'react';

import {EditableSpan} from './Components/EditableSpan';
import {AddItemForm} from './Components/AddItemForm';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, updateTaskAC, removeTaskAC} from './Reducers/taskReducer';
import {changeTasksAC, removeTodolistAC, TodolistsDomainType, updateTodolistTitleAC} from './Reducers/todolistReducer';
import {TaskStatuses, TaskType} from './api/todolists-api';


type PropsType = {
    /*title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void*/
    todolistID: string
    /* filter: FilterValuesType
     changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
     removeTodolist: (todolistID: string) => void
     changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
     updateTaskTitle: (todolistID: string, title: string) => void
     updateTodolistTitle: (todolistID: string, title: string) => void*/
}

export function TodoList1(props: PropsType) {


    const todolist = useSelector<AppRootStateType, TodolistsDomainType>(state => state.todolists.filter(f => f.id === props.todolistID)[0])


    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

    const dispatch = useDispatch()

    if (todolist.filter === 'active')
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    if (todolist.filter === 'completed')
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

    const onClickAllHandler = () => {
        //props.changeTasks(props.todolistID, 'all')
        dispatch(changeTasksAC(props.todolistID, 'all'))
    }
    const onClickActiveHandler = () => {
        //props.changeTasks(props.todolistID, 'active')
        dispatch(changeTasksAC(props.todolistID, 'active'))
    }
    const onClickCompletedHandler = () => {
        //props.changeTasks(props.todolistID, 'completed')
        dispatch(changeTasksAC(props.todolistID, 'completed'))
    }
    const onClickRemoveHandler = () => {
        //props.removeTodolist(props.todolistID)
        dispatch(removeTodolistAC(props.todolistID))
    }
    const onChangeTaskTitle = (taskId: string, newTitle: string) => {
        //props.changeTaskTitle(props.todolistID, taskId, newTitle)
        dispatch(updateTaskAC(props.todolistID, taskId, {title: newTitle}))
    }
    const removeTaskHandler = (taskId: string) => {
        //props.removeTask(props.todolistID, taskId)
        dispatch(removeTaskAC(props.todolistID, taskId))
    }
    const onChangeHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
        //props.changeTaskStatus(props.todolistID, taskId, event.currentTarget.checked)
        dispatch(updateTaskAC(props.todolistID, taskId, {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }
    const updateTaskTitleHandler = (title: string) => {
        //props.updateTaskTitle(props.todolistID, title)
        dispatch(addTaskAC({
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
        }))
    }
    const updateTodolistTitleHandler = (title: string) => {
        //props.updateTodolistTitle(props.todolistID, title)
        dispatch(updateTodolistTitleAC(props.todolistID, title))
    }
    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} onChangeTitle={updateTodolistTitleHandler}/>
                {/*<button onClick={onClickRemoveHandler}>X</button>*/}
                <IconButton onClick={onClickRemoveHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm
                    addItem={updateTaskTitleHandler}
                />
                <div>
                    {
                        tasks.map(t => {
                            return <li key={t.id}
                                       className={t.status === TaskStatuses.Completed ? 'is-done' : ''}>
                                <Checkbox
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(t.id, e)}
                                    checked={t.status === TaskStatuses.Completed}/>
                                <EditableSpan
                                    title={t.title}
                                    onChangeTitle={(newTitle: string) => onChangeTaskTitle(t.id, newTitle)}
                                />
                                {/*    <button onClick={() => removeTaskHandler(t.id)}>x
                                </button>*/}
                                <IconButton onClick={() => removeTaskHandler(t.id)}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        })
                    }
                </div>
            </div>
            <div>
                <Button color={'inherit'} variant={todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onClickAllHandler}>All
                </Button>
                <Button color={"secondary"} variant={todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onClickActiveHandler}>Active
                </Button>
                <Button color={"error"} variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onClickCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
}
