import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../state/store';
import {
    addTDL, changeTDListFilter, changeTDLTitle, fetchTDL, FilterType, removeTDL, TDLType
} from '../state/todolist-reducer';
import {addTaskTC, changeTaskTC, removeTaskTC, TasksListType} from '../state/tasks-reducer';
import {TaskStatus} from '../api/api';
import {Container, Grid} from '@mui/material';
import {AddItem} from './AddItem';
import {ToDoList} from './ToDoList';

export const TDL = React.memo(() => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TDLType>>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksListType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTDL())
    }, [])

    const removeTask = useCallback((toDoListId: string, taskId: string) => {
        dispatch(removeTaskTC(toDoListId, taskId))
    }, [dispatch])
    const addTask = useCallback((toDoListId: string, title: string) => {
        if (toDoListId && title) dispatch(addTaskTC(toDoListId, title))
    }, [dispatch])
    const changeStatus = useCallback((toDoListId: string, taskId: string, status: TaskStatus) => {
        dispatch(changeTaskTC(toDoListId, taskId, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((toDoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTC(toDoListId, taskId, null, title))
    }, [dispatch])

    const removeList = useCallback((toDoListId: string) => {
        dispatch(removeTDL(toDoListId))
    }, [dispatch])
    const addToDoList = useCallback((title: string) => {
        if (title) dispatch(addTDL(title))
    }, [dispatch])
    const changeToDoListTitle = useCallback((toDoListId: string, newTitle: string) => {
        dispatch(changeTDLTitle(toDoListId, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((toDoListId: string, filter: FilterType) => {
        dispatch(changeTDListFilter({toDoListId, filter}))
    }, [dispatch])

    return <>
        <Grid sx={{marginTop: 3, marginLeft: 3}}>
            <AddItem addItem={(title: string) => addToDoList(title)}
                     defaultTitle={'Новый ToDoList'}
            />
        </Grid>
        <Container maxWidth="xl" sx={{marginTop: 3}}>
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
    </>
})