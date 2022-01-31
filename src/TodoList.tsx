import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./Components/EditableSpan";
import {AddItemForm} from "./Components/AddItemForm";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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

function TodoList(props: PropsType) {

    const onClickAllHandler = () => props.changeTasks(props.todolistID, 'all')
    const onClickActiveHandler = () => props.changeTasks(props.todolistID, 'active')
    const onClickCompletedHandler = () => props.changeTasks(props.todolistID, 'completed')
    const onClickRemoveHandler = () => props.removeTodolist(props.todolistID)
    const onChangeTaskTitle = (taskId: string, newTitle: string) => props.changeTaskTitle(props.todolistID, taskId, newTitle)
    const removeTaskHandler = (taskId: string) => props.removeTask(props.todolistID, taskId)
    const onChangeHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, taskId, event.currentTarget.checked)
    const updateTaskTitleHandler = (title: string) => props.updateTaskTitle(props.todolistID, title)
    const updateTodolistTitleHandler = (title: string) => props.updateTodolistTitle(props.todolistID, title)
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
                    addItem={updateTaskTitleHandler}
                />
                <div>
                    {
                        props.tasks.map(t => {
                            return <li key={t.id}
                                       className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(t.id, e)}
                                       checked={t.isDone}/>
                                <EditableSpan
                                    title={t.title}
                                    onChangeTitle={(newTitle: string) => onChangeTaskTitle(t.id, newTitle)}
                                />
                            {/*    <button onClick={() => removeTaskHandler(t.id)}>x
                                </button>*/}
                                <IconButton onClick={() => removeTaskHandler(t.id)}>
                                    <Delete />
                                </IconButton>
                            </li>
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
}

export default TodoList;