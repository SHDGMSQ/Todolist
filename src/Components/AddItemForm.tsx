import React, {ChangeEvent, KeyboardEvent, useReducer} from "react";
import {onChangeInputAC, setTrimValueAC, TitleReducer} from "../Reducers/TitleReducer";
import {addTaskItemFormAC, ErrorReducer, onChangeErrorAC} from "../Reducers/ErrorReducer";
import {Button} from "@mui/material"



type AddItemFormPropsType = {
    addItem:(title: string) => void

}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, titleDispatch] = useReducer(TitleReducer, "")
    let [error, errorDispatch] = useReducer(ErrorReducer, null)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        //setError(null)
        //setTitle(e.currentTarget.value)
        errorDispatch(onChangeErrorAC())
        let newValue = e.currentTarget.value
        titleDispatch(onChangeInputAC(newValue))
    }
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            return addTask();
    }
    const addTask = () => {
        /*if (title === '') {
            setError('Title is required')
            return
        } else {
            props.addItem(title.trim())
            setTitle("")
        }*/
        if (title === '') {
            errorDispatch(addTaskItemFormAC())
        } else {
            props.addItem(title.trim())
            titleDispatch(setTrimValueAC())
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeInput}
                   onKeyPress={enterInput}
            />
            <Button onClick={addTask}>+</Button>
            <div className={error ? 'error-message' : ''}>{error}</div>
        </div>
    )
}