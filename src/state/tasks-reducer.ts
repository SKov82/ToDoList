import {v1} from 'uuid';
import {TasksListType} from '../App';
import {tdlInitialState} from './todolist-reducer';

type ActionType = removeTaskACType
    | addTaskACType
    | changeTaskTitleACType
    | changeStatusACType
    | addTasksArrayACType
    | removeTasksArrayACType

const initialState: TasksListType = {
    [tdlInitialState[0]?.id]: [
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Python", isDone: true},
        {id: v1(), title: "Django", isDone: true},
    ],
    [tdlInitialState[1]?.id]: [
        {id: v1(), title: "Хлеб", isDone: true},
        {id: v1(), title: "Молоко", isDone: false},
        {id: v1(), title: "Сок", isDone: false},
        {id: v1(), title: "Витамины", isDone: true},
    ],
    [tdlInitialState[2]?.id]: [
        {id: v1(), title: "Дориан Грей", isDone: true},
        {id: v1(), title: "Зеленая миля", isDone: true},
        {id: v1(), title: "Знакомьтесь, Джо Блэк", isDone: true},
    ]
}

export const tasksReducer = (state: TasksListType = initialState, action: ActionType): TasksListType => {
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