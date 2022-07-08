import React from 'react';
import {action} from '@storybook/addon-actions'
import {Task} from '../components/Task';
import {TaskPriority, TaskStatus} from '../api/api';

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
              task={ {
                  id: '1',
                  title: "React",
                  status: TaskStatus.InProgress,
                  todoListId: 'tdl1',
                  startDate: '',
                  deadline: '',
                  addedDate: '',
                  order: 0,
                  priority: TaskPriority.Middle,
                  completed: false,
                  description: ''
              } }
              changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
        />
        <Task todolistID={'tdl2'}
              task={ {
                  id: '2',
                  title: "JS / TS",
                  status: TaskStatus.Completed,
                  todoListId: 'tdl2',
                  startDate: '',
                  deadline: '',
                  addedDate: '',
                  order: 0,
                  priority: TaskPriority.Middle,
                  completed: true,
                  description: ''
              } }
              changeStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}
              removeTask={removeTaskCallback}
        />
    </>
}
