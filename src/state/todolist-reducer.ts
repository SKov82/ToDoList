import {API, TodoListType} from '../api/api';
import {Dispatch} from 'redux';
import {addTasksArray, removeTasksArray, setTasks} from './tasks-reducer';
import {setStatus} from './app-reducer';
import {apiErrorHandler, networkErrorHandler} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterType = 'all' | 'active' | 'done'
export type TDLType = TodoListType & {
    filter: FilterType
}
export const tdlInitialState: Array<TDLType> = []
const slice = createSlice({
    name: 'todolist',
    initialState: tdlInitialState,
    reducers: {
        removeTDList(state, action: PayloadAction<string>) {
            return state.filter(tdl => tdl.id !== action.payload)
            // const index = state.findIndex(tdl => tdl.id === action.payload)
            // if (index !== -1) state.splice(index, 1)
        },
        addTDList(state, action: PayloadAction<TodoListType>) {
            state.unshift({...action.payload, filter: 'all'})
        },
        changeTDListTitle(state, action: PayloadAction<{toDoListId: string, title: string}>) {
            const index = state.findIndex(tdl => tdl.id === action.payload.toDoListId)
            state[index].title = action.payload.title
            // return state.map(tdl => tdl.id === action.payload.toDoListId ? {...tdl, title: action.payload.title} : tdl)
        },
        changeTDListFilter(state, action: PayloadAction<{toDoListId: string, filter: FilterType}>) {
            const index = state.findIndex(tdl => tdl.id === action.payload.toDoListId)
            state[index].filter = action.payload.filter
            // return state.map(tdl => tdl.id === action.payload.toDoListId ? {...tdl, filter: action.payload.filter} : tdl)
        },
        setTDList(state, action: PayloadAction<TodoListType[]>) {
            return action.payload.map(tdl => ({...tdl, filter: 'all'}))
        },
    },
})
export const todolistReducer = slice.reducer
export const {removeTDList, addTDList, changeTDListTitle, changeTDListFilter, setTDList} = slice.actions

export const fetchTDL = (): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.getTDL().then(data => {
            data.forEach(tdl => {
                dispatch(addTasksArray(tdl.id))
                API.getTasks(tdl.id)
                    .then(data => dispatch(setTasks({toDoListId: tdl.id, tasks: data.items})))
                    .catch(error => networkErrorHandler(error, dispatch))
            })
            dispatch(setTDList(data))
            dispatch(setStatus('success'))
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}
export const addTDL = (title: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.createTDL(title).then(data => {
            if (!data.resultCode) {
                dispatch(addTasksArray(data.data.item.id))
                dispatch(addTDList(data.data.item))
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}
export const removeTDL = (toDoListId: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.deleteTDL(toDoListId).then(data => {
            if (!data.resultCode) {
                dispatch(removeTDList(toDoListId))
                dispatch(removeTasksArray(toDoListId))
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}
export const changeTDLTitle = (toDoListId: string, title: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.updateTDL(toDoListId, title).then(data => {
            if (!data.resultCode) {
                dispatch(changeTDListTitle({toDoListId, title}))
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}