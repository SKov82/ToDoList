export type AppInitStateType = {
    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
}
const appState: AppInitStateType = {
    status: 'idle',
    error: 'Ошибка !',
}
export const appReducer = (state: AppInitStateType = appState, action: ActionType): AppInitStateType => {
    switch (action.type) {
        case 'SET_STATUS':
            return {...state, status: action.status}
        case 'SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
type ActionType = any