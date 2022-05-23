import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./Components/EditableSpan";
import {AddItemForm} from "./Components/AddItemForm";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    todolistID: string
    filter: FilterValuesType
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    updateTaskTitle: (todolistID: string, title: string) => void
    updateTodolistTitle: (todolistID: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('Todolist')
    const onClickAllHandler = useCallback (  () => props.changeTasks(props.todolistID, 'all'), [props.todolistID])
    const onClickActiveHandler =useCallback (() => props.changeTasks(props.todolistID, 'active'), [props.todolistID])
    const onClickCompletedHandler =useCallback (() => props.changeTasks(props.todolistID, 'completed'), [props.todolistID])

    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone )
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }
    const onClickRemoveHandler = useCallback (() => props.removeTodolist(props.todolistID), [props.todolistID])
    const addTask = useCallback ((title: string) => props.updateTaskTitle(props.todolistID, title), [props.addTask, props.todolistID])
    const updateTodolistTitleHandler = useCallback ((title: string) => props.updateTodolistTitle(props.todolistID, title), [props.todolistID])
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={updateTodolistTitleHandler}/>
                {/*<button onClick={onClickRemoveHandler}>X</button>*/}
                <IconButton onClick={onClickRemoveHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <div>
                <AddItemForm
                    addItem={addTask}
                />
                <div>
                    {
                        tasksForTodolist.map(t => {
                            return <Task
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
