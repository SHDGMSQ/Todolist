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
    changeTaskStatus: (todolistID: string, taskId: string, event: boolean) => void
}

export const Task = React.memo(({
                                    task,
                                    todolistID,
                                    removeTask,
                                    changeTaskTitle,
                                    changeTaskStatus
                                }: TaskPropsType) => {

    const onChangeTaskTitle = useCallback((taskId: string, newTitle: string) => changeTaskTitle(todolistID, task.id, newTitle), [changeTaskTitle, todolistID, task.id, task.title])
    const removeTaskHandler = useCallback((taskId: string) => removeTask(todolistID, taskId), [removeTask, todolistID, task.id])
    const onChangeHandler = useCallback((taskId: string, event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, taskId, event.currentTarget.checked), [changeTaskStatus, todolistID, task.id, task.isDone])


    return <div>
        <li key={task.id}
            className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(task.id, e)}
                checked={task.isDone}/>
            <EditableSpan
                title={task.title}
                onChangeTitle={(newTitle: string) => onChangeTaskTitle(task.id, newTitle)}
            />
            <IconButton onClick={() => removeTaskHandler(task.id)}>
                <Delete/>
            </IconButton>
        </li>
    </div>
})
