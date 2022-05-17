import React from 'react';
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

    function removeTask(toDoListId: string, taskId: string) {
        dispatch(removeTaskAC(toDoListId, taskId))
    }
    function addTask(toDoListId: string, title: string) {
        if (title && toDoListId) dispatch(addTaskAC(toDoListId, title))
    }
    function changeStatus(toDoListId: string, taskId: string) {
        dispatch(changeStatusAC(toDoListId, taskId))
    }
    function changeTaskTitle(toDoListId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(toDoListId, taskId, newTitle))
    }

    function removeList(toDoListId: string) {
        dispatch(removeTasksArrayAC(toDoListId))
        dispatch(removeTDListAC(toDoListId))
    }
    function addToDoList(title: string) {
        if (title) {
            let toDoListId = v1()
            dispatch(addTDListAC(toDoListId, title))
            dispatch(addTasksArrayAC(toDoListId))
        }
    }
    function changeToDoListTitle(toDoListId: string, newTitle: string) {
        dispatch(changeTDLTitleAC(toDoListId, newTitle))
    }
    function changeFilter(toDoListId: string, filter: FilterType) {
        dispatch(changeFilterAC(toDoListId, filter))
    }

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
                        let filteredTasks = tasks[el.id]
                        if (el.filter === 'active') filteredTasks = tasks[el.id].filter(task => !task.isDone)
                        if (el.filter === 'done') filteredTasks = tasks[el.id].filter(task => task.isDone)

                        return <ToDoList
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            filter={el.filter}
                            removeList={removeList}
                            changeToDoListTitle={changeToDoListTitle}
                        />
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;