import React from 'react';
import {action} from '@storybook/addon-actions'
import {Task} from '../components/Task';

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskStories = (props: any) => {
    return <>
        <Task todolistID={'tdl1'}
              task={ {id: '1', title: "React", isDone: false} }
              changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
        />
        <Task todolistID={'tdl2'}
              task={ {id: '2', title: "JS / TS", isDone: true} }
              changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
        />
    </>
}
