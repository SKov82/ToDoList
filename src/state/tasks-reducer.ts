import {API, TaskStatus, TaskType} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateType} from './store';

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
                [ action.payload.task, ...state[action.payload.task.todoListId] ]
            }
        case 'CHANGE-TASK':
            return {...state, [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(
                t => t.id === action.payload.task.id ? action.payload.task : t
            )}
        case 'ADD-TASKS-ARRAY':
            return { [action.payload.toDoListId]: [], ...state }
        case 'REMOVE-TASKS-ARRAY':
            let newState = {...state}
            delete newState[action.payload.toDoListId]
            return newState
        case 'SET-TASKS':
            return {...state,
                [action.payload.toDoListId]: action.payload.tasks
            }
        default:
            return state
    }
}

type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof addTasksArrayAC>
    | ReturnType<typeof removeTasksArrayAC>
    | ReturnType<typeof SetTasks>

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: {toDoListId, taskId} } as const
}
export const addTaskAC = (task: TaskType) => {
    return { type: 'ADD-TASK', payload: {task} } as const
}
export const changeTaskAC = (task: TaskType) => {
    return { type: 'CHANGE-TASK', payload: {task} } as const
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
export const changeTaskTC = (
    toDoListId: string, taskId: string, status: TaskStatus | null = null, title: string | null = null
): any => {
    console.log(status)
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const task = getState().tasks[toDoListId].filter(t => t.id === taskId)[0]
        const newTask = {
            ...task,
            title: title || task.title,
            status: status === null ? task.status : status,
        }
        API.updateTask(toDoListId, taskId, newTask).then(data => {
            if (!data.resultCode) dispatch(changeTaskAC(data.data.item))
        })
    }
}