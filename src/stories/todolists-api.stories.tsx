import React, {useEffect, useState} from 'react';
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
};


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.createTodolist()
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '9c5901a6-6daf-414f-bf7e-7dc3b6991658';
        const title = 'wefkjwenfwerjgowrgj'
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {

        const todolistId = '3ed5b059-e35e-4394-b280-7be36e44bacd';

        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
