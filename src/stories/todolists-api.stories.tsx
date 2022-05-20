import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default {
    title: 'API'
};
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b365fbe8-0446-4f2a-ad5f-3c9421879b5e'
    }
};

export const GetTodolists = () => {
    const [state, setState] = useState(null);
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'NEW TODO'}, settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '9c5901a6-6daf-414f-bf7e-7dc3b6991658'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'NEWNEWNEWTODO'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect( () => {

        const todolistId = 'd8a216f8-a671-444f-9185-4fd56afdb587'

       axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then( (res) => {
                setState(res.data)
            } )
    }, [] )
    return <div>{JSON.stringify(state)}</div>
};
