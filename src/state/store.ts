import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
})
export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store