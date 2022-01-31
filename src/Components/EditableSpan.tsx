import React, {ChangeEvent, KeyboardEvent, useReducer} from "react";
import {onDoubleClickEditAC, EditReducer, onBlurEditAC} from "../Reducers/EditReducer";
import {EditableTitleReducer, onChangeInputTitleAC, onDoubleClickTitleAC} from "../Reducers/EditableTitleReducer";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const [edit, editDispatch] = useReducer(EditReducer, false)
    const [title, titleDispatch] = useReducer(EditableTitleReducer, '')

    const onDoubleClickHandler = () => {
        //setEdit(true)
        //setTitle(props.title)
        editDispatch(onDoubleClickEditAC())
        let title = props.title
        titleDispatch(onDoubleClickTitleAC(title))
    }
    const onBlurHandler = () => {
        //setEdit(false)
        editDispatch(onBlurEditAC())
        props.onChangeTitle(title)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //setTitle(e.currentTarget.value)
        let title = e.currentTarget.value
        titleDispatch(onChangeInputTitleAC(title))
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