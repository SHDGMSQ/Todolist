import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValuesType} from '../todolist-reducer';
import {fetchTasksTC} from '../task-reducer';
import {useAppDispatch} from '../../../app/hooks';
import {RequestStatusType} from '../../../app/app-reducer';


type PropsType = {
    entityStatus: RequestStatusType
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    todolistID: string
    filter: FilterValuesType
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistID: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolistID))
    }, [])

    const onClickAllHandler = useCallback (  () => props.changeTasks(props.todolistID, 'all'), [props.todolistID])
    const onClickActiveHandler =useCallback (() => props.changeTasks(props.todolistID, 'active'), [props.todolistID])
    const onClickCompletedHandler =useCallback (() => props.changeTasks(props.todolistID, 'completed'), [props.todolistID])

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }
    const onClickRemoveHandler = useCallback (() => props.removeTodolist(props.todolistID), [props.todolistID])
    const addTask = useCallback ((title: string) => {
        props.addTask(props.todolistID, title)}, [props.addTask, props.todolistID])
    const updateTodolistTitleHandler = useCallback ((title: string) => props.updateTodolistTitle(props.todolistID, title), [props.todolistID])
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={updateTodolistTitleHandler} disabled={props.entityStatus === 'loading'}/>
                <IconButton onClick={onClickRemoveHandler} disabled={props.entityStatus === 'loading'}>
                    <Delete />
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
                                disable={props.entityStatus === 'loading'}
                                key={t.id}
                                task={t}
                                removeTask={props.removeTask}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                                todolistID={props.todolistID}
                            />
                        })
                    }
                </div>
            </div>
            <div>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onClickAllHandler}>All
                </Button>
                <Button color={"secondary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onClickActiveHandler}>Active
                </Button>
                <Button color={"error"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onClickCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
})
