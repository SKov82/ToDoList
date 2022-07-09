import {API, TaskType} from '../api/api';
import {Dispatch} from 'redux';

export type TasksListType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksListType = {}

export const tasksReducer = (state: TasksListType = initialState, action: ActionType): TasksListType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.payload.toDoListId]:
                state[action.payload.toDoListId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.payload.task.todoListId]:
                [ {...action.payload.task}, ...state[action.payload.task.todoListId] ]
            }
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].map(
                t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t
            )}
        case 'CHANGE-STATUS':
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].map(
                t => t.id === action.payload.taskId ? {...t, completed: !t.completed} : t
            )}
        case 'ADD-TASKS-ARRAY':
            return { [action.payload.toDoListId]: [], ...state }
        case 'REMOVE-TASKS-ARRAY':
            let newState = {...state}
            delete newState[action.payload.toDoListId]
            return newState
        case 'SET-TASKS':
            return {...state, [action.payload.toDoListId]: action.payload.tasks}
        default:
            return state
    }
}

type ActionType = removeTaskACType
    | addTaskACType
    | changeTaskTitleACType
    | changeStatusACType
    | addTasksArrayACType
    | removeTasksArrayACType
    | SetTasksType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTasksArrayACType = ReturnType<typeof addTasksArrayAC>
type removeTasksArrayACType = ReturnType<typeof removeTasksArrayAC>
type SetTasksType = ReturnType<typeof SetTasks>

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: {toDoListId, taskId} } as const
}
export const addTaskAC = (task: TaskType) => {
    return { type: 'ADD-TASK', payload: {task} } as const
}
export const changeTaskTitleAC = (toDoListId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: {toDoListId, taskId, title} } as const
}
export const changeStatusAC = (toDoListId: string, taskId: string) => {
    return { type: 'CHANGE-STATUS', payload: {toDoListId, taskId} } as const
}
export const addTasksArrayAC = (toDoListId: string) => {
    return { type: 'ADD-TASKS-ARRAY', payload: {toDoListId} } as const
}
export const removeTasksArrayAC = (toDoListId: string) => {
    return { type: 'REMOVE-TASKS-ARRAY', payload: {toDoListId} } as const
}
export const SetTasks = (toDoListId: string, tasks: Array<TaskType>) => {
    return { type: 'SET-TASKS', payload: {toDoListId, tasks} } as const
}

export const addTaskTC = (toDoListId: string, title: string): any => {
    return (dispatch: Dispatch) => {
        API.createTask(toDoListId, title).then(data => {
            if (!data.resultCode) {
                dispatch(addTaskAC(data.data.item))
            }
        })
    }
}
export const removeTaskTC = (toDoListId: string, taskId: string): any => {
    return (dispatch: Dispatch) => {
        API.deleteTask(toDoListId, taskId).then(data => {
            if (!data.resultCode) {
                dispatch(removeTaskAC(toDoListId, taskId))
            }
        })
    }
}
