import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./TodoList";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";

export type TaskPropsType = {
    todolistID: string
    taskId: string
}

export const Task = React.memo(({
                                    taskId,
                                    todolistID,
                                    removeTask,
                                    changeTaskTitle,
                                    changeTaskStatus
                                }: TaskPropsType) => {

    const onChangeTaskTitle = useCallback((taskId: string, newTitle: string) => changeTaskTitle(todolistID, taskId, newTitle), [changeTaskTitle, todolistID, task.id, task.title])
    const removeTaskHandler = useCallback((taskId: string) => removeTask(todolistID, taskId), [removeTask, todolistID, task.id])
    const onChangeHandler = useCallback((taskId: string, event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, taskId, event.currentTarget.checked), [changeTaskStatus, todolistID, task.id, task.isDone])


    return <li key={t.id}
               className={t.isDone ? 'is-done' : ''}>
        <Checkbox
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(t.id, e)}
            checked={t.isDone}/>
        <EditableSpan
            title={t.title}
            onChangeTitle={(newTitle: string) => onChangeTaskTitle(t.id, newTitle)}
        />
        <IconButton onClick={() => removeTaskHandler(t.id)}>
            <Delete/>
        </IconButton>
    </li>
})
