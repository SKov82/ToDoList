import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '97e468f6-5b68-452f-8b2e-b1ab07a6dd98'},
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type CreateTDLResponseType = ResponseType<{item: TodoListType}>

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
type CrUpdTaskResponseType = {
    data: {
        item: TaskType
    }
    resultCode: number
    messages: Array<string>
}

export const API = {
    getTDL() {
        return instance.get<Array<TodoListType>>(`todo-lists`).then(response => response.data)
    },
    createTDL(tdl: {title: string}) {
        return instance.post<CreateTDLResponseType>(`todo-lists`, {tdl}).then(response => response.data)
    },
    deleteTDL(tdlID: string) {
        return instance.delete<ResponseType>(`todo-lists/${tdlID}`).then(response => response.data)
    },
    updateTDL(tdlID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${tdlID}`, {title}).then(response => response.data)
    },

    getTasks(tdlID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${tdlID}/tasks`).then(response => response.data)
    },
    createTask(tdlID: string, taskTitle: string) {
        return instance.post<CrUpdTaskResponseType>(`todo-lists/${tdlID}/tasks`, {taskTitle}).then(response => response.data)
    },
    deleteTask(tdlID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${tdlID}/tasks/${taskID}`).then(response => response.data)
    },
    updateTask(tdlID: string, taskID: string, task: any) {
        return instance.put<CrUpdTaskResponseType>(`todo-lists/${tdlID}/tasks/${taskID}`, {...task}).then(response => response.data)
    },
}