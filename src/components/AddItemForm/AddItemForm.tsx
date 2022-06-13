import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null);
        }
        setTitle(e.currentTarget.value);

    };
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            return addTask();
    };
    const addTask = () => {
        if (title === '') {
            setError('Title is required');
            return;
        } else {
            props.addItem(title.trim());
            setTitle('');
        }
    };
    return (
        <div>
            {/*   <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeInput}
                   onKeyPress={enterInput}
            />*/}
            <TextField value={title}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={onChangeInput}
                       onKeyPress={enterInput}
                       error={!!error}
                       helperText={error}
                       disabled={props.disabled}
            />
            <IconButton color="primary" onClick={addTask} disabled={props.disabled}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});
