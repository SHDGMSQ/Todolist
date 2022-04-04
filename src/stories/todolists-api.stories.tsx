import React, {useEffect, useState} from 'react';
import {tasksApi, todolistApi} from '../api/todolist-api';

export default {
    title: 'API'
}

//todolists

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

//tasks
export type TaskBodyType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

let TaskBody = {
    title: 'UPDATED-TITLE',
    description: '',
    completed: false,
    status: 0,
    priority: 0,
    startDate: '',
    deadline: '',
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todolistId = 'a7b53abe-ff75-4fa4-869f-eda7d0f8baa0'
        tasksApi.getTask(todolistId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'a7b53abe-ff75-4fa4-869f-eda7d0f8baa0'
        let title = 'NewREACT'
        tasksApi.createTask(todolistId,title)
            .then( (res) => {
                setState(res.data)
            } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'a7b53abe-ff75-4fa4-869f-eda7d0f8baa0'
        let taskId = 'bdd9ba18-a071-4174-8bea-ebc9dc5df93f'
        tasksApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'a7b53abe-ff75-4fa4-869f-eda7d0f8baa0'
        let taskId = '8b586d36-ad7e-453e-8135-fb4218d3053c'
        tasksApi.updateTask(todolistId, taskId, TaskBody)
            .then( (res) => {
                setState(res.data)
            } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
