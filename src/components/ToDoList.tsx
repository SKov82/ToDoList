import React, {useCallback} from 'react';
import {FilterType} from '../state/todolist-reducer'
import {AddItem} from './AddItem';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Grid, List, Paper, Typography} from '@mui/material';
import {Task} from './Task';
import {TaskType} from '../api/api';

type ToDoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (toDoListId: string, taskId: string) => void
    changeFilter: (toDoListId: string, filter: FilterType) => void
    addTask: (toDoListId: string, title: string) => void
    changeStatus: (toDoListId: string, taskId: string) => void
    changeTaskTitle: (toDoListId: string, taskId: string, newTitle: string) => void
    filter: FilterType
    removeList: (toDoListId: string) => void
    changeToDoListTitle: (toDoListId: string, newTitle: string) => void
}

export const ToDoList = React.memo( (props: ToDoListType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }, [props.changeToDoListTitle, props.id])

    const onClickHandler = useCallback(() => {
        props.removeList(props.id)
    }, [props.removeList, props.id])

    let filteredTasks = props.tasks
    if (props.filter === 'active') filteredTasks = props.tasks.filter(task => !task.completed)
    if (props.filter === 'done') filteredTasks = props.tasks.filter(task => task.completed)

    return (
        <Grid item sm={6} md={4} lg={3}>
            <Paper elevation={20} sx={{marginBottom: 3, padding: 3, bgcolor: "#fbfae4", width: "fit-content"}}>
                <Typography position="relative" variant="h5" component="div" align="center" gutterBottom={true} fontWeight={600} maxWidth={270}>
                    <EditableSpan title={props.title}
                                  onChange={changeToDoListTitle}
                                  onClick={onClickHandler}
                    />
                </Typography>

                <AddItem addItem={addTask} defaultTitle={''} />

                <List sx={{ width: '100%', maxWidth: 270 }}>
                    {filteredTasks.map(el => <Task key={el.id}
                                                   todolistID={props.id}
                                                   task={el}
                                                   changeStatus={props.changeStatus}
                                                   changeTaskTitle={props.changeTaskTitle}
                                                   removeTask={props.removeTask} />
                    )}
                </List>

                <ButtonGroup variant={'outlined'}
                             color={'primary'}
                             size={'small'}
                >
                    <Button onClick={ () => props.changeFilter(props.id, 'all') }
                            variant={props.filter === 'all' ? 'contained' : undefined}
                    > Все </Button>

                    <Button onClick={ () => props.changeFilter(props.id, 'active') }
                            variant={props.filter === 'active' ? 'contained' : undefined}
                    > Активные </Button>

                    <Button onClick={ () => props.changeFilter(props.id, 'done') }
                            variant={props.filter === 'done' ? 'contained' : undefined}
                    > Завершенные </Button>
                </ButtonGroup>
            </Paper>
        </Grid>
    );
} )