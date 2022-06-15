import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';

export type TaskPropsType = {
    todolistID: string
    task: TaskType
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    disable?: boolean
}

export const Task = React.memo(({
                                    task,
                                    todolistID,
                                    removeTask,
                                    changeTaskTitle,
                                    changeTaskStatus,
                                    disable
                                }: TaskPropsType) => {

    const onClickHandler = useCallback(() => removeTask(todolistID, task.id), [removeTask, task.id]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        changeTaskStatus(todolistID, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
    }, [changeTaskStatus, task.id]);
    const onChangeTaskTitle = useCallback((newTitle: string) => changeTaskTitle(todolistID, task.id, newTitle), [changeTaskTitle, task.id]);


    return <div>
        <li key={task.id}
            className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeHandler}
                checked={task.status === TaskStatuses.Completed}
                disabled={disable}/>
            <EditableSpan
                title={task.title}
                onChangeTitle={onChangeTaskTitle}
                disabled={disable}
            />
            <IconButton onClick={onClickHandler} disabled={disable}>
                <Delete/>
            </IconButton>
        </li>
    </div>;
});
