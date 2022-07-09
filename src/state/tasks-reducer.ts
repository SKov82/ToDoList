import {v1} from 'uuid';
import {API, TaskPriority, TaskStatus, TaskType} from '../api/api';
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
            // addedDate: "2022-07-09T16:54:21.0306531Z"
            // deadline: null
            // description: null
            // id: "864a14ce-7388-4da7-bef3-4a41c579f00e"
            // order: 0
            // priority: 1
            // startDate: null
            // status: 0
            // title: "new task"
            // todoListId: "b86c17eb-5a26-439f-b829-31a6c8e5bea6"
            return {...state, [action.payload.toDoListId]:
                [{
                    id: v1(),
                    title: action.payload.title,
                    status: TaskStatus.InProgress,
                    todoListId: action.payload.toDoListId,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriority.Middle,
                    completed: false,
                    description: ''
                }, ...state[action.payload.toDoListId] ]
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
export const addTaskAC = (toDoListId: string, title: string) => {
    return { type: 'ADD-TASK', payload: {toDoListId, title} } as const
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
                dispatch(addTaskAC(toDoListId, title))
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
