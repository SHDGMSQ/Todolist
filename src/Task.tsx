import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./TodoList";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";

export type TaskPropsType = {
    todolistID: string
    task: TaskType
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export const Task = React.memo(({
                                    task,
                                    todolistID,
                                    removeTask,
                                    changeTaskTitle,
                                    changeTaskStatus
                                }: TaskPropsType) => {

    const onClickHandler = useCallback(() => removeTask(todolistID, task.id), [removeTask, task.id])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked),[changeTaskStatus, task.id])
    const onChangeTaskTitle = useCallback((newTitle: string) => changeTaskTitle(todolistID, task.id, newTitle), [changeTaskTitle, task.id])


    return <div>
        <li key={task.id}
            className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeHandler}
                checked={task.isDone}/>
            <EditableSpan
                title={task.title}
                onChangeTitle={onChangeTaskTitle}
            />
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    </div>
})
