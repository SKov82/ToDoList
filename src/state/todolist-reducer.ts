import {API, TodoListType} from '../api/api';
import {Dispatch} from 'redux';
import {addTasksArrayAC, removeTasksArrayAC, SetTasks} from './tasks-reducer';
import {setError, setStatus} from './app-reducer';

export type FilterType = 'all' | 'active' | 'done'
export type TDLType = TodoListType & {
    filter: FilterType
}
export const tdlInitialState: Array<TDLType> = []
export const todolistReducer = (state: Array<TDLType> = tdlInitialState, action: ActionType): TDLType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.toDoListId)
        case 'ADD-TODOLIST':
            return [{...action.toDoList, filter: 'all'}, ...state]
        case 'CHANGE-TDL-TITLE':
            return state.map(tl => tl.id === action.toDoListId ? {...tl, title: action.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.toDoListId ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.toDoLists.map(tdl => ( {...tdl, filter: 'all'} ))
        default:
            return state
    }
}
type ActionType = ReturnType<typeof removeTDListAC>
    | ReturnType<typeof addTDListAC>
    | ReturnType<typeof changeTDLTitleAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof SetTDL>

export const removeTDListAC = (toDoListId: string) => ({type: 'REMOVE-TODOLIST', toDoListId} as const)
export const addTDListAC = (toDoList: TodoListType) => ({type: 'ADD-TODOLIST', toDoList} as const)
export const changeTDLTitleAC = (toDoListId: string, title: string) => ({type: 'CHANGE-TDL-TITLE', toDoListId, title} as const)
export const changeFilterAC = (toDoListId: string, filter: FilterType) => ({type: 'CHANGE-FILTER', toDoListId, filter} as const)
export const SetTDL = (toDoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', toDoLists} as const)

export const fetchTDL = (): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.getTDL().then(data => {
            data.forEach(tdl => {
                dispatch(addTasksArrayAC(tdl.id))
                API.getTasks(tdl.id).then(data => dispatch(SetTasks(tdl.id, data.items)))
            })
            dispatch(SetTDL(data))
            dispatch(setStatus('success'))
        })
    }
}
export const addTDL = (title: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.createTDL(title).then(data => {
            if (!data.resultCode) {
                dispatch(addTasksArrayAC(data.data.item.id))
                dispatch(addTDListAC(data.data.item))
                dispatch(setStatus('success'))
            } else {
                data.messages.forEach(m => dispatch(setError(m)))
                dispatch(setStatus('failed'))
            }
        })
    }
}
export const removeTDL = (toDoListId: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.deleteTDL(toDoListId).then(data => {
            if (!data.resultCode) {
                dispatch(removeTDListAC(toDoListId))
                dispatch(removeTasksArrayAC(toDoListId))
                dispatch(setStatus('success'))
            } else {
                data.messages.forEach(m => dispatch(setError(m)))
                dispatch(setStatus('failed'))
            }
        })
    }
}
export const changeTDLTitle = (toDoListId: string, title: string): any => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        API.updateTDL(toDoListId, title).then(data => {
            if (!data.resultCode) {
                dispatch(changeTDLTitleAC(toDoListId, title))
                dispatch(setStatus('success'))
            } else {
                data.messages.forEach(m => dispatch(setError(m)))
                dispatch(setStatus('failed'))
            }
        })
    }
}