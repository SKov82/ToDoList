import {TodoListType} from '../api/api';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'done'
export type TDLType = TodoListType & {
    filter: FilterType
}

export const tdlInitialState: Array<TDLType> = [
    {id: v1(), title: 'What to learn ', addedDate: '', order: 0, filter: 'all'},
    {id: v1(), title: 'What to buy ', addedDate: '', order: 1, filter: 'active'},
    {id: v1(), title: 'Films to watch ', addedDate: '', order: 2, filter: 'done'},
]

export const todolistReducer = (state: Array<TDLType> = tdlInitialState, action: ActionType): TDLType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.toDoListId)
        case 'ADD-TODOLIST':
            return [{
                id: action.payload.toDoListId,
                title: action.payload.title,
                addedDate: '',
                order: state.length,
                filter: 'all'
            }, ...state]
        case 'CHANGE-TDL-TITLE':
            return state.map(tl => tl.id === action.payload.toDoListId ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.payload.toDoListId ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

type ActionType = removeTDListACType
    | addTDListACType
    | changeTDLTitleACType
    | changeFilterACType

type removeTDListACType = ReturnType<typeof removeTDListAC>
type addTDListACType = ReturnType<typeof addTDListAC>
type changeTDLTitleACType = ReturnType<typeof changeTDLTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTDListAC = (toDoListId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: {toDoListId} } as const
}
export const addTDListAC = (toDoListId: string, title: string) => {
    return { type: 'ADD-TODOLIST', payload: {toDoListId, title} } as const
}
export const changeTDLTitleAC = (toDoListId: string, title: string) => {
    return { type: 'CHANGE-TDL-TITLE', payload: {toDoListId, title} } as const
}
export const changeFilterAC = (toDoListId: string, filter: FilterType) => {
    return { type: 'CHANGE-FILTER', payload: {toDoListId, filter} } as const
}