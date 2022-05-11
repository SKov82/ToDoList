import {FilterType, ToDoListType} from '../App';
import {v1} from 'uuid';

export type ActionType = {
    type: 'REMOVE-TODOLIST'
        | 'ADD-TODOLIST'
        | 'CHANGE-TITLE'
        | 'CHANGE-FILTER'
    id: string
    title?: string
    filter?: FilterType
}

export const todolistReducer = (state: Array<ToDoListType>, action: ActionType): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [ { id: action.id, title: action.title || '', filter: 'all' }, ...state ]
        case 'CHANGE-TITLE':
            let tdl = state.find(el => el.id === action.id)
            if (tdl) tdl.title = action.title || ''
            return [ ...state ]
        case 'CHANGE-FILTER':
            let tdlist= state.find(el => el.id === action.id)
            if (tdlist) tdlist.filter = action.filter || 'all'
            return [ ...state ]
        default:
            return state
    }
}

export const removeTDListActionCreator = (id: string): ActionType => {
    return { type: 'REMOVE-TODOLIST', id: id }
}
export const addTDListActionCreator = (title: string): ActionType => {
    return { type: 'ADD-TODOLIST', id: v1(), title: title }
}
export const changeTitleActionCreator = (id: string, title: string): ActionType => {
    return { type: 'CHANGE-TITLE', id: id, title: title }
}
export const changeFilterActionCreator = (id: string, filter: FilterType): ActionType => {
    return {type: 'CHANGE-FILTER', id: id, filter: filter}
}
