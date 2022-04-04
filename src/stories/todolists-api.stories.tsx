import React, {useEffect, useState} from 'react';
import {todolistApi} from '../api/todolist-api';

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodolists().then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'NewREACT'
        todolistApi.createTodolists(title)
            .then( (res) => {
                setState(res.data)
            } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '1baa589a-45c6-4fee-a4c1-aefb89958c7a'
        todolistApi.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '469b6cd3-6957-44b1-8747-d7182724f2f4'
        let title = 'REACT18!!!'
        todolistApi.updateTodolists(todolistId, title)
            .then( (res) => {
                setState(res.data)
            } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}