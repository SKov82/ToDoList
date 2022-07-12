export type StatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitStateType = {
    status: StatusType
    error: string | null
}
const appInitState: AppInitStateType = {
    status: 'idle',
    error: null,
}
export const appReducer = (state: AppInitStateType = appInitState, action: ActionType): AppInitStateType => {
    switch (action.type) {
        case 'SET_STATUS':
            return {...state, status: action.status}
        case 'SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
type ActionType = ReturnType<typeof setStatus>
    | ReturnType<typeof setError>

export const setStatus = (status: StatusType) => ({type: 'SET_STATUS', status} as const)
export const setError = (error: string | null) => ({type: 'SET_ERROR', error} as const)