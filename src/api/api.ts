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
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type CreateTDLResponseType = ResponseType<{item: TodoListType}>
type DelUpdTDLResponseType = ResponseType<{}>

export const API = {
    getTDL() {
        return instance.get<Array<TodoListType>>(`todo-lists`).then(response => response.data)
    },
    createTDL(tdl: {title: string}) {
        return instance.post<CreateTDLResponseType>(`todo-lists`, {tdl}).then(response => response.data)
    },
    deleteTDL(tdlID: string) {
        return instance.delete<DelUpdTDLResponseType>(`todo-lists/${tdlID}`).then(response => response.data)
    },
    updateTDL(tdlID: string, title: string) {
        return instance.put<DelUpdTDLResponseType>(`todo-lists/${tdlID}`, {title}).then(response => response.data)
    },
    getTasks(tdlID: string) {
        return instance.get(`todo-lists/${tdlID}/tasks`).then(response => response.data)
    },
}