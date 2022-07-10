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
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK':
            return {...state, [action.task.todoListId]: state[action.task.todoListId].map(
                t => t.id === action.task.id ? action.task : t)}
        case 'ADD-TASKS-ARRAY':
            return {[action.toDoListId]: [], ...state}
        case 'REMOVE-TASKS-ARRAY':
            let newState = {...state}
            delete newState[action.toDoListId]
            return newState
        case 'SET-TASKS':
            return {...state, [action.toDoListId]: action.tasks}
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

export const removeTaskAC = (toDoListId: string, taskId: string) => ({type: 'REMOVE-TASK', toDoListId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskAC = (task: TaskType) => ({type: 'CHANGE-TASK', task} as const)
export const addTasksArrayAC = (toDoListId: string) => ({type: 'ADD-TASKS-ARRAY', toDoListId} as const)
export const removeTasksArrayAC = (toDoListId: string) => ({type: 'REMOVE-TASKS-ARRAY', toDoListId} as const)
export const SetTasks = (toDoListId: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', toDoListId, tasks} as const)

export const addTaskTC = (toDoListId: string, title: string): any => {
    return (dispatch: Dispatch) => {
        API.createTask(toDoListId, title).then(data => {
            if (!data.resultCode) dispatch(addTaskAC(data.data.item))
        })
    }
}
export const removeTaskTC = (toDoListId: string, taskId: string): any => {
    return (dispatch: Dispatch) => {
        API.deleteTask(toDoListId, taskId).then(data => {
            if (!data.resultCode) dispatch(removeTaskAC(toDoListId, taskId))
        })
    }
}
export const changeTaskTC = (
    toDoListId: string, taskId: string, status: TaskStatus | null = null, title: string | null = null
): any => {
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