import React from 'react';
import {FilterType} from '../App'
import {AddItem} from './AddItem';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type ToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string) => void
    filter: FilterType
    removeList: (toDoListId: string) => void
    changeToDoListTitle: (toDoListId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function ToDoList(props: ToDoListType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeToDoListTitle}/>

                <IconButton onClick={ () => props.removeList(props.id) }
                            color={'primary'}
                            size={'small'}
                >
                    <DeleteIcon fontSize={'small'} />
                </IconButton>
            </h3>

            <AddItem addItem={addTask} defaultTitle={''} />

            <ul>
                {props.tasks.map(el => {
                    const onChangeHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.id, el.id, newTitle)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={() => props.changeStatus(el.id, props.id)}
                            />

                            <EditableSpan title={el.title} onChange={onChangeHandler} />

                            <IconButton onClick={ () => props.removeTask(el.id, props.id) }
                                        color={'primary'}
                                        size={'small'}
                            >
                                <DeleteIcon fontSize={'small'} />
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <ButtonGroup variant={'outlined'}
                         color={'primary'}
                         size={'small'}
            >
                <Button onClick={ () => props.changeFilter('all', props.id) }
                        variant={props.filter === 'all' ? 'contained' : undefined}
                > Все </Button>

                <Button onClick={ () => props.changeFilter('active', props.id) }
                        variant={props.filter === 'active' ? 'contained' : undefined}
                > Активные </Button>

                <Button onClick={ () => props.changeFilter('done', props.id) }
                        variant={props.filter === 'done' ? 'contained' : undefined}
                > Завершенные </Button>
            </ButtonGroup>
        </div>
    );
}

