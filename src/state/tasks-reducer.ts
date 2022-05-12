import {v1} from 'uuid';
import {TasksListType} from '../App';

type ActionType = removeTaskACType
    | addTaskACType
    | changeTaskTitleACType
    | changeStatusACType
    | addTasksArrayACType
    | removeTasksArrayACType

export const tasksReducer = (state: TasksListType, action: ActionType): TasksListType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.payload.toDoListId]:
                state[action.payload.toDoListId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.payload.toDoListId]:
                [ {id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.toDoListId] ]
            }
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].map(
                t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t
            )}
        case 'CHANGE-STATUS':
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].map(
                t => t.id === action.payload.taskId ? {...t, isDone: !t.isDone} : t
            )}
        case 'ADD-TASKS-ARRAY':
            return { [action.payload.toDoListId]: [], ...state }
        case 'REMOVE-TASKS-ARRAY':
            let newState = {...state}
            delete newState[action.payload.toDoListId]
            return newState
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: {toDoListId, taskId} } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (toDoListId: string, title: string) => {
    return { type: 'ADD-TASK', payload: {toDoListId, title} } as const
}
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (toDoListId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: {toDoListId, taskId, title} } as const
}
type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (toDoListId: string, taskId: string) => {
    return { type: 'CHANGE-STATUS', payload: {toDoListId, taskId} } as const
}
type addTasksArrayACType = ReturnType<typeof addTasksArrayAC>
export const addTasksArrayAC = (toDoListId: string) => {
    return { type: 'ADD-TASKS-ARRAY', payload: {toDoListId} } as const
}
type removeTasksArrayACType = ReturnType<typeof removeTasksArrayAC>
export const removeTasksArrayAC = (toDoListId: string) => {
    return { type: 'REMOVE-TASKS-ARRAY', payload: {toDoListId} } as const
}
