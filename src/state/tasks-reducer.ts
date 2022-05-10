import {v1} from 'uuid';
import {TasksListType} from '../App';

export type ActionType = {
    type: 'REMOVE-TASK'
        | 'ADD-TASK'
        | 'CHANGE-TITLE'
        | 'CHANGE-STATUS'
    tdlId?: string
    taskId?: string
    title?: string
}

export const tasksReducer = (state: TasksListType, action: ActionType): TasksListType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            if (action.tdlId && action.taskId) {
                return {...state, [action.tdlId]: state[action.tdlId].filter(t => t.id !== action.taskId)}
            }
            return state
        case 'ADD-TASK':
            if (action.title && action.tdlId) {
                return {...state, [action.tdlId]:
                        [ {id: v1(), title: action.title, isDone: false}, ...state[action.tdlId] ]
                }
            }
            return state
        case 'CHANGE-TITLE':
            if (action.tdlId && action.taskId && action.title) {
                return {...state, [action.tdlId]: state[action.tdlId].map(
                    t => t.id === action.taskId ? {...t, title: action.title || ''} : t
                )}
            }
            return state
        case 'CHANGE-STATUS':
            if (action.tdlId && action.taskId) {
                return {...state, [action.tdlId]: state[action.tdlId].map(
                    t => t.id === action.taskId ? {...t, isDone: !t.isDone} : t
                )}
            }
            return state
        default:
            return state
    }
}

export const removeTaskAC = (tdlId: string, taskId: string): ActionType => {
    return { type: 'REMOVE-TASK', tdlId: tdlId, taskId: taskId }
}
export const addTaskAC = (title: string, tdlId: string): ActionType => {
    return { type: 'ADD-TASK', title: title, tdlId: tdlId }
}
export const changeTitleAC = (tdlId: string, taskId: string, title: string): ActionType => {
    return { type: 'CHANGE-TITLE', tdlId: tdlId, taskId: taskId, title: title }
}
export const changeStatusAC = (tdlId: string, taskId: string): ActionType => {
    return {type: 'CHANGE-STATUS', tdlId: tdlId, taskId: taskId}
}
