import {API, TaskStatus, TaskType} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType} from './store';
import {setStatus} from './app-reducer';
import {apiErrorHandler, networkErrorHandler} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TasksListType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksListType = {}
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{toDoListId: string, taskId: string}>) {
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].filter(
                t => t.id !== action.payload.taskId
            )}
        },
        addTask(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
            // return {...state, [action.payload.todoListId]: [action.payload, ...state[action.payload.todoListId]]}
        },
        changeTask(state, action: PayloadAction<TaskType>) {
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(
                t => t.id === action.payload.id ? action.payload : t
            )}
        },
        addTasksArray(state, action: PayloadAction<string>) {
            state[action.payload] = []
            // return {[action.payload]: [], ...state}
        },
        removeTasksArray(state, action: PayloadAction<string>) {
            delete state[action.payload]
        },
        setTasks(state, action: PayloadAction<{toDoListId: string, tasks: TaskType[]}>) {
            state[action.payload.toDoListId] = action.payload.tasks
            // return {...state, [action.payload.toDoListId]: action.payload.tasks}
        },
    },
})
export const tasksReducer = slice.reducer
export const {removeTask, addTask, changeTask, addTasksArray, removeTasksArray, setTasks} = slice.actions

export const addTaskTC = (toDoListId: string, title: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.createTask(toDoListId, title).then(data => {
            if (!data.resultCode) {
                dispatch(addTask(data.data.item))
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}
export const removeTaskTC = (toDoListId: string, taskId: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.deleteTask(toDoListId, taskId).then(data => {
            if (!data.resultCode) {
                dispatch(removeTask({toDoListId, taskId}))
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}
export const changeTaskTC = (
    toDoListId: string, taskId: string, status: TaskStatus | null = null, title: string | null = null
): any => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const task = getState().tasks[toDoListId].filter(t => t.id === taskId)[0]
        const newTask = {
            ...task,
            title: title || task.title,
            status: status === null ? task.status : status,
        }
        dispatch(setStatus('loading'))
        API.updateTask(toDoListId, taskId, newTask).then(data => {
            if (!data.resultCode) {
                dispatch(changeTask(data.data.item))
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}