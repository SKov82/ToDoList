import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../state/store';
import {combineReducers, createStore} from 'redux';
import {tdlInitialState, todolistReducer} from '../state/todolist-reducer';
import {tasksReducer} from '../state/tasks-reducer';
import {v1} from 'uuid';
import {TaskPriority, TaskStatus} from '../api/api';
import {appReducer} from '../state/app-reducer';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
})

const initialState: AppStateType = {
    todolists: [
        {id: v1(), title: 'What to learn ', addedDate: '', order: 0, filter: 'all'},
        {id: v1(), title: 'Films to watch ', addedDate: '', order: 2, filter: 'done'},
    ],
    tasks: {
        ['tdl1']: [
            {
                id: v1(),
                title: "JS/TS",
                status: TaskStatus.Completed,
                todoListId: tdlInitialState[0]?.id,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriority.Middle,
                description: ''
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatus.InProgress,
                todoListId: tdlInitialState[0]?.id,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriority.Middle,
                description: ''
            },
        ],
        ['tdl2']: [
            {
                id: v1(),
                title: "Дориан Грей",
                status: TaskStatus.Completed,
                todoListId: tdlInitialState[2]?.id,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriority.Middle,
                description: ''
            },
            {
                id: v1(),
                title: "Зеленая миля",
                status: TaskStatus.Completed,
                todoListId: tdlInitialState[2]?.id,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriority.Middle,
                description: ''
            },
        ],
    },
    app: {
        status: 'idle',
        error: null,
    }
}

export const storyBookStore = createStore(rootReducer, initialState)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>
        { story() }
    </Provider>
}