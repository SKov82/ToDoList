import {FilterType, ToDoListType} from '../App';
import {v1} from 'uuid';

type ActionType = {
    type: 'REMOVE-TODOLIST'
        | 'ADD-TODOLIST'
        | 'CHANGE-TITLE'
        | 'CHANGE-FILTER'
    id?: string
    title?: string
    filter?: FilterType
}

export const todolistReducer = (state: Array<ToDoListType>, action: ActionType): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [ {id: v1(), title: action.title || '', filter: 'all'},
                ...state ]
        case 'CHANGE-TITLE':
            let tdl = state.find(el => el.id === action.id)
            if (tdl) tdl.title = action.title || ''
            return [ ...state ]
        case 'CHANGE-FILTER':
            let tdlist= state.find(el => el.id === action.id)
            if (tdlist) tdlist.filter = action.filter || 'all'
            return [ ...state ]
        default:
            throw new Error('Unknown action type')
    }
}