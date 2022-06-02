import React, {useCallback} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";
import {v1} from 'uuid';
import {AddItem} from './components/AddItem';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTaskAC, addTasksArrayAC, changeStatusAC, changeTaskTitleAC,
    removeTaskAC, removeTasksArrayAC
} from './state/tasks-reducer';
import {
    addTDListAC, changeFilterAC, changeTDLTitleAC, removeTDListAC
} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './state/store';

export type FilterType = 'all' | 'active' | 'done'
export type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksListType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<ToDoListType>>( state => state.todolists )
    const tasks = useSelector<AppStateType, TasksListType>( state => state.tasks )

    const removeTask = useCallback((toDoListId: string, taskId: string) => {
        dispatch(removeTaskAC(toDoListId, taskId))
    }, [dispatch])
    const addTask = useCallback((toDoListId: string, title: string) => {
        if (title && toDoListId) dispatch(addTaskAC(toDoListId, title))
    }, [dispatch])
    const changeStatus = useCallback((toDoListId: string, taskId: string) => {
        dispatch(changeStatusAC(toDoListId, taskId))
    }, [dispatch])
    const changeTaskTitle = useCallback((toDoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(toDoListId, taskId, newTitle))
    }, [dispatch])

    const removeList = useCallback((toDoListId: string) => {
        dispatch(removeTasksArrayAC(toDoListId))
        dispatch(removeTDListAC(toDoListId))
    }, [dispatch])
    const addToDoList = useCallback((title: string) => {
        if (title) {
            let toDoListId = v1()
            dispatch(addTDListAC(toDoListId, title))
            dispatch(addTasksArrayAC(toDoListId))
        }
    }, [dispatch])
    const changeToDoListTitle = useCallback((toDoListId: string, newTitle: string) => {
        dispatch(changeTDLTitleAC(toDoListId, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((toDoListId: string, filter: FilterType) => {
        dispatch(changeFilterAC(toDoListId, filter))
    }, [dispatch])

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

            <Grid sx={{ marginTop: 3, marginLeft: 3 }}>
                <AddItem addItem={ (title: string) => addToDoList(title) }
                         defaultTitle={'Новый ToDoList'}
                />
            </Grid>

            <Container maxWidth="xl" sx={{ marginTop: 3 }}>
                <Grid container spacing={5} justifyContent={'space-evenly'}>
                    {todolists.map(el => {
                        return <ToDoList
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            tasks={tasks[el.id]}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            filter={el.filter}
                            removeList={removeList}
                            changeToDoListTitle={changeToDoListTitle}
                        />
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;