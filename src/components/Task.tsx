import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import React, {useCallback} from 'react';
import { TaskType } from '../api/api';

type TaskPropsType = {
    todolistID: string
    task: TaskType
    changeStatus: (toDoListId: string, taskId: string) => void
    changeTaskTitle: (toDoListId: string, taskId: string, newTitle: string) => void
    removeTask: (toDoListId: string, taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.todolistID, props.task.id])

    const onClickHandler = useCallback(() => {
        props.removeTask(props.todolistID, props.task.id)
    }, [props.removeTask, props.todolistID, props.task.id])

    return (
        <ListItem className={`${props.task.completed ? 'is-done' : ''} ${'listItem'}`}
                  divider={true}
                  sx={{padding: '5px'}}
        >
            <Checkbox checked={props.task.completed}
                      onChange={() => props.changeStatus(props.todolistID, props.task.id)}
                      size={'small'}
            />

            <EditableSpan title={props.task.title}
                          onChange={onChangeHandler}
                          onClick={onClickHandler}
            />
        </ListItem>
    )
} )