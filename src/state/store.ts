import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})
export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store