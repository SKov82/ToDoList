import {FilterType, ToDoListType} from '../App';
import {v1} from 'uuid';

type ActionType = removeTDListACType
    | addTDListACType
    | changeTDLTitleACType
    | changeFilterACType

export const tdlInitialState: Array<ToDoListType> = [
    {id: v1(), title: 'What to learn ', filter: 'all'},
    {id: v1(), title: 'What to buy ', filter: 'active'},
    {id: v1(), title: 'Films to watch ', filter: 'done'},
]

export const todolistReducer = (state: Array<ToDoListType> = tdlInitialState, action: ActionType): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.toDoListId)
        case 'ADD-TODOLIST':
            return [ { id: action.payload.toDoListId, title: action.payload.title, filter: 'all' }, ...state ]
        case 'CHANGE-TDL-TITLE':
            return state.map(tl => tl.id === action.payload.toDoListId ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.payload.toDoListId ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

type removeTDListACType = ReturnType<typeof removeTDListAC>
export const removeTDListAC = (toDoListId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: {toDoListId} } as const
}
type addTDListACType = ReturnType<typeof addTDListAC>
export const addTDListAC = (toDoListId: string, title: string) => {
    return { type: 'ADD-TODOLIST', payload: {toDoListId, title} } as const
}
type changeTDLTitleACType = ReturnType<typeof changeTDLTitleAC>
export const changeTDLTitleAC = (toDoListId: string, title: string) => {
    return { type: 'CHANGE-TDL-TITLE', payload: {toDoListId, title} } as const
}
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (toDoListId: string, filter: FilterType) => {
    return {type: 'CHANGE-FILTER', payload: {toDoListId, filter} } as const
}