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
                debugger
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {

    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
