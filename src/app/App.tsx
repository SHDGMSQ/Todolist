import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useAppSelector} from './hooks';


export const App = () => {


    const status = useAppSelector(state => state.app.status)

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color='secondary'/>}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
};


