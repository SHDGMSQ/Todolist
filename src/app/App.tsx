import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useAppSelector} from './hooks';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export const App: React.FC<PropsType> = ({demo = false}) => {


    const status = useAppSelector(state => state.app.status)

    return (

        <div className="App">
            <ErrorSnackbar/>
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
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
};

type PropsType = {
    demo?: boolean
}
