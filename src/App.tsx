import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Alert from './components/ui/Alert'
import {TDL} from './components/TDL';
import {useSelector} from 'react-redux';
import {AppStateType} from './state/store';
import {StatusType} from './state/app-reducer';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/ui/Login';

function App() {
    const status = useSelector<AppStateType, StatusType>(state => state.app.status)
    const style = status === 'loading' ? 1 : 0

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ToDoLists
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <LinearProgress sx={{ bgcolor: 'orange', opacity: `${style}` }} />

            <Routes>
                <Route path='/' element={<TDL />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
            </Routes>

            <Alert />
        </div>
    );
}
export default App;