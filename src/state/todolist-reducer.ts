import {API, TodoListType} from '../api/api';
import {Dispatch} from 'redux';
import {addTasksArrayAC, removeTasksArrayAC, SetTasks} from './tasks-reducer';

export type FilterType = 'all' | 'active' | 'done'
export type TDLType = TodoListType & {
    filter: FilterType
}

export const tdlInitialState: Array<TDLType> = []

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
        case 'SET-TODOLISTS':
            return action.payload.toDoLists.map(tdl => ( {...tdl, filter: 'all'} ))
        default:
            return state
    }
}

type ActionType = removeTDListACType
    | addTDListACType
    | changeTDLTitleACType
    | changeFilterACType
    | SetTDLType

type removeTDListACType = ReturnType<typeof removeTDListAC>
type addTDListACType = ReturnType<typeof addTDListAC>
type changeTDLTitleACType = ReturnType<typeof changeTDLTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type SetTDLType = ReturnType<typeof SetTDL>

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
export const SetTDL = (toDoLists: Array<TodoListType>) => {
    return { type: 'SET-TODOLISTS', payload: {toDoLists} } as const
}

export const fetchTDL = (): any => {
    return (dispatch: Dispatch) => {
        API.getTDL().then(data => {
            data.forEach(tdl => {
                dispatch(addTasksArrayAC(tdl.id))
                API.getTasks(tdl.id).then(data => dispatch(SetTasks(tdl.id, data.items)))
            })
            dispatch(SetTDL(data))
        })
    }
}
export const addTDL = (title: string): any => {
    return (dispatch: Dispatch) => {
        API.createTDL(title).then(data => {
            if (!data.resultCode) {
                dispatch(addTasksArrayAC(data.data.item.id))
                dispatch(addTDListAC(data.data.item.id, title))
            }
        })
    }
}
export const removeTDL = (toDoListId: string): any => {
    return (dispatch: Dispatch) => {
        API.deleteTDL(toDoListId).then(data => {
            if (!data.resultCode) {
                dispatch(removeTDListAC(toDoListId))
                dispatch(removeTasksArrayAC(toDoListId))
            }
        })
    }
}