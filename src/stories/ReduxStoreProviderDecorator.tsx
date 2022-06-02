import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../state/store';
import {combineReducers, createStore} from 'redux';
import {todolistReducer} from '../state/todolist-reducer';
import {tasksReducer} from '../state/tasks-reducer';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

const initialState = {
    todolists: [
        {id: 'tdl1', title: 'What to learn ', filter: 'all'},
        {id: 'tdl2', title: 'Films to watch ', filter: 'done'},
    ],
    tasks: {
        ['tdl1']: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JS / TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Python", isDone: true},
            {id: v1(), title: "Django", isDone: false},
        ],
        ['tdl2']: [
            {id: v1(), title: "Дориан Грей", isDone: true},
            {id: v1(), title: "Зеленая миля", isDone: false},
            {id: v1(), title: "Знакомьтесь, Джо Блэк", isDone: true},
        ],
    }
}

export const storyBookStore = createStore(rootReducer, initialState as AppStateType)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>
        { story() }
    </Provider>
}