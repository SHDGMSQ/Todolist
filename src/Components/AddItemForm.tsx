import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material"
import {ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)

    }
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            return addTask();
    }
    const addTask = () => {
        if (title === '') {
            setError('Title is required')
            return
        } else {
            props.addItem(title.trim())
            setTitle("")
        }
    }
    return (
        <div>
            <TextField value={title}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={onChangeInput}
                       onKeyPress={enterInput}
                       error={!!error}
                       helperText={error}
            />
            <IconButton color='primary' onClick={addTask}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})