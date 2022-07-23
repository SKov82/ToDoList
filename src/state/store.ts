import {combineReducers} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
})
export type AppStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.appState = store.getState()