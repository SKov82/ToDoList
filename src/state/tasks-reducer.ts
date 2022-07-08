import {v1} from 'uuid';
import {tdlInitialState} from './todolist-reducer';
import {TaskPriority, TaskStatus, TaskType} from '../api/api';

export type TasksListType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksListType = {
    [tdlInitialState[0]?.id]: [
        {
            id: v1(),
            title: "JS/TS",
            status: TaskStatus.Completed,
            todoListId: tdlInitialState[0]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "React",
            status: TaskStatus.InProgress,
            todoListId: tdlInitialState[0]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: false,
            description: ''
        },
        {
            id: v1(),
            title: "Python",
            status: TaskStatus.Completed,
            todoListId: tdlInitialState[0]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
    ],
    [tdlInitialState[1]?.id]: [
        {
            id: v1(),
            title: "Хлеб",
            status: TaskStatus.Completed,
            todoListId: tdlInitialState[1]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "Молоко",
            status: TaskStatus.InProgress,
            todoListId: tdlInitialState[1]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: false,
            description: ''
        },
    ],
    [tdlInitialState[2]?.id]: [
        {
            id: v1(),
            title: "Дориан Грей",
            status: TaskStatus.Completed,
            todoListId: tdlInitialState[2]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "Зеленая миля",
            status: TaskStatus.Completed,
            todoListId: tdlInitialState[2]?.id,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
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
        case 'SET-TODOLISTS':
            const copyState: TasksListType = {}
            action.payload.tasks.forEach(t => {
                if (copyState[t.todoListId]) {
                    copyState[t.todoListId].push(t)
                } else {
                    copyState[t.todoListId] = [t]
                }
            })
            return copyState
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
    | SetTDLType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTasksArrayACType = ReturnType<typeof addTasksArrayAC>
type removeTasksArrayACType = ReturnType<typeof removeTasksArrayAC>

type SetTDLType = ReturnType<typeof SetTDL>

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

export const SetTDL = (tasks: Array<TaskType>) => {
    return { type: 'SET-TODOLISTS', payload: {tasks} } as const
}