import React from 'react';
import './App.css';
import {AppBar, Button, LinearProgress, Toolbar, Typography} from '@mui/material';
import Alert from './components/ui/Alert'
import {TDL} from './components/TDL';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './state/store';
import {authMe, StatusType} from './state/app-reducer';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Login } from './components/ui/Login';

function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppStateType, StatusType>(state => state.app.status)
    const style = status === 'loading' ? 1 : 0
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.app.isLoggedIn)

    const logoutHandler = () => dispatch(authMe({type: 'logout'}))

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink  to='/' className='link'>
                            ToDoLists
                        </NavLink>
                    </Typography>

                    {isLoggedIn
                        ? <Button onClick={logoutHandler} color="inherit">Logout</Button>
                        : <Button href='/login' color="inherit">Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <LinearProgress sx={{ bgcolor: 'orange', opacity: `${style}` }} />

            <Routes>
                <Route path='/' element={<TDL />} />
                <Route path='/login' element={<Login />} />
                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path='*' element={<Navigate to='/404' />} />
            </Routes>

            <Alert />
        </div>
    );
}
export default App;