export type AppStateType = any
const appState = null
export const appReducer = (state: AppStateType = appState, action: ActionType): AppStateType => {
    switch (action.type) {
        case '':
            return {...state}
        default:
            return state
    }
}
type ActionType = any