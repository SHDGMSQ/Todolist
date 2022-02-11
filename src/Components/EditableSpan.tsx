import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>( '')

    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle(props.title)
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.onChangeTitle(title)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13){
            onBlurHandler()
        }
    }
    return edit
       ? <TextField
            value={title}
            onBlur={onBlurHandler}
            autoFocus
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressHandler}
        />
       : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
}