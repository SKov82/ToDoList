import axios from 'axios';

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type CreateTDLResponseType = ResponseType<{item: TodoListType}>

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type CrUpdTaskResponseType = ResponseType<{item: TaskType}>

type AuthType = ResponseType<{
    id: number
    email: string
    login: string
}>
type LoginType = ResponseType<{userId: number}>

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '97e468f6-5b68-452f-8b2e-b1ab07a6dd98'},
})

export const API = {
    // todolist
    getTDL() {
        return instance.get<Array<TodoListType>>(`todo-lists`).then(response => response.data)
    },
    createTDL(title: string) {
        return instance.post<CreateTDLResponseType>(`todo-lists`, {title}).then(response => response.data)
    },
    deleteTDL(tdlID: string) {
        return instance.delete<ResponseType>(`todo-lists/${tdlID}`).then(response => response.data)
    },
    updateTDL(tdlID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${tdlID}`, {title}).then(response => response.data)
    },
    // tasks
    getTasks(tdlID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${tdlID}/tasks`).then(response => response.data)
    },
    createTask(tdlID: string, title: string) {
        return instance.post<CrUpdTaskResponseType>(`todo-lists/${tdlID}/tasks`, {title}).then(response => response.data)
    },
    deleteTask(tdlID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${tdlID}/tasks/${taskID}`).then(response => response.data)
    },
    updateTask(tdlID: string, taskID: string, task: TaskType) {
        return instance.put<CrUpdTaskResponseType>(`todo-lists/${tdlID}/tasks/${taskID}`, {...task}).then(response => response.data)
    },
    // auth
    auth() {
        return instance.get<AuthType>('auth/me').then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginType>('auth/login', {email, password, rememberMe}).then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login').then(response => response.data)
    },
}