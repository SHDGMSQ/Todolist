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
    const [title, setTitle] = useState<string>('');


    const createTodoHandler = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            });
    };

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value);
            }} value={title}/>
            <button onClick={createTodoHandler}>createTodolist</button>
        </div>

    </div>;
};

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolists, setTodolists] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setTodolists(res.data);
            });
    }, []);

    const updateTodoHandler = () => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
                todolistsAPI.getTodolists()
                    .then((res) => {
                        setTodolists(res.data);
                    });
            });
    };

    return <div>{JSON.stringify(state)}
        <div>{JSON.stringify(todolists)}</div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value);
            }} value={todolistId}/>
        </div>
        <div>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value);
            }}/>
        </div>
        <div>
            <button onClick={updateTodoHandler}>updateTodo</button>
        </div>
    </div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [todolists, setTodolists] = useState<any>('');

    useEffect(() => {

        todolistsAPI.getTodolists()
            .then((res) => {
                setTodolists(res.data);
            });
    }, []);

    const deleteTodolistHandler = () => {

        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
                todolistsAPI.getTodolists()
                    .then((res) => {
                        setTodolists(res.data);
                    });
            });

    };

    return <div>{JSON.stringify(state)}
        <div>{JSON.stringify(todolists)}</div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value);
            }} value={todolistId}/>
        </div>
        <div>
            <button onClick={deleteTodolistHandler}>deleteTodolist</button>
        </div>
    </div>;
};
