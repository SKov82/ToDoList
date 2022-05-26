import React, {useCallback} from 'react';
import {FilterType} from '../App'
import {AddItem} from './AddItem';
import {EditableSpan} from './EditableSpan';
import {
    Button, ButtonGroup, Checkbox, Grid, IconButton, List, ListItem, Paper, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = React.memo( (props: ToDoListType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }, [props.changeToDoListTitle, props.id])

    let filteredTasks = props.tasks
    if (props.filter === 'active') filteredTasks = props.tasks.filter(task => !task.isDone)
    if (props.filter === 'done') filteredTasks = props.tasks.filter(task => task.isDone)

    return (
        <Grid item sm={6} md={4} lg={3}>
            <Paper elevation={20} sx={{marginBottom: 3, padding: 3, bgcolor: "#fbfae4", width: "fit-content"}}>
                <Typography variant="h5" component="div" align="center" gutterBottom={true} fontWeight={600} maxWidth={270}>
                    <EditableSpan title={props.title} onChange={changeToDoListTitle}/>

                    <IconButton onClick={ () => props.removeList(props.id) }
                                color={'primary'}
                                size={'small'}
                    >
                        <DeleteIcon fontSize={'small'} />
                    </IconButton>
                </Typography>

                <AddItem addItem={addTask} defaultTitle={''} />

                <List sx={{ width: '100%', maxWidth: 270 }}>
                    {filteredTasks.map(el => {
                        const onChangeHandler = (newTitle: string) => {
                            props.changeTaskTitle(props.id, el.id, newTitle)
                        }

                        return (
                            <ListItem key={el.id}
                                      className={el.isDone ? 'is-done' : ''}
                                      divider={true}
                                      sx={{ padding: "5px" }}
                            >
                                <Checkbox
                                    checked={el.isDone}
                                    onChange={ () => props.changeStatus(props.id, el.id) }
                                    size={'small'}
                                />

                                <EditableSpan title={el.title} onChange={onChangeHandler} />

                                <IconButton onClick={ () => props.removeTask(props.id, el.id) }
                                            color={'primary'}
                                            size={'small'}
                                >
                                    <DeleteIcon fontSize={'small'} />
                                </IconButton>
                            </ListItem>
                        )
                    })}
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
