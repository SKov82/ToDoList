import {Checkbox, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import React, {useCallback} from 'react';
import {TaskStatus, TaskType} from '../api/api';

type TaskPropsType = {
    todolistID: string
    task: TaskType
    changeStatus: (toDoListId: string, taskId: string, status: TaskStatus) => void
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

    const onChangeCheckboxHandler = useCallback(() => {
        let status = props.task.status === TaskStatus.New ? TaskStatus.Completed : TaskStatus.New
        props.changeStatus(props.todolistID, props.task.id, status)
    }, [props.changeStatus, props.todolistID, props.task.id, props.task.status])

    return (
        <ListItem className={`${props.task.status === TaskStatus.Completed ? 'is-done' : ''} ${'listItem'}`}
                  divider={true}
                  sx={{padding: '5px'}}
        >
            <Checkbox checked={props.task.status === TaskStatus.Completed}
                      onChange={onChangeCheckboxHandler}
                      size={'small'}
            />

            <EditableSpan title={props.task.title}
                          onChange={onChangeHandler}
                          onClick={onClickHandler}
            />
        </ListItem>
    )
} )