import {Dispatch} from 'redux';
import {API} from '../api/api';
import {apiErrorHandler, networkErrorHandler} from '../utils/error-utils';

export type StatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitStateType = {
    status: StatusType
    error: string | null
    isLoggedIn: boolean
}
const appInitState: AppInitStateType = {
    status: 'idle',
    error: null,
    isLoggedIn: false,
}
export const appReducer = (state: AppInitStateType = appInitState, action: AppActionType): AppInitStateType => {
    switch (action.type) {
        case 'SET_STATUS':
            return {...state, status: action.status}
        case 'SET_ERROR':
            return {...state, error: action.error}
        case 'AUTH_TOGGLE':
            return {...state, isLoggedIn: !state.isLoggedIn}
        default:
            return state
    }
}
export type AppActionType = ReturnType<typeof setStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof authToggle>

export const setStatus = (status: StatusType) => ({type: 'SET_STATUS', status} as const)
export const setError = (error: string | null) => ({type: 'SET_ERROR', error} as const)
export const authToggle = () => ({type: 'AUTH_TOGGLE'} as const)

type AuthPropsType = {
    type: 'auth' | 'login' | 'logout'
    email: string
    password: string
    rememberMe: boolean
}
export const authMe = ({type, email, password, rememberMe}: AuthPropsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatus('loading'))
        const res = type === 'auth'
            ? API.auth()
            : type === 'login'
                ? API.login(email, password, rememberMe)
                : API.logout()
        res.then(data => {
            if (!data.resultCode) {
                dispatch(authToggle())
                dispatch(setStatus('success'))
            } else apiErrorHandler(data, dispatch)
        }).catch(error => networkErrorHandler(error, dispatch))
    }
}
// export const logIn = (email: string, password: string, rememberMe: boolean) => {
//     return (dispatch: Dispatch) => {
//         dispatch(setStatus('loading'))
//         API.login(email, password, rememberMe).then(data => {
//             if (!data.resultCode) {
//                 dispatch(authToggle())
//                 dispatch(setStatus('success'))
//             } else apiErrorHandler(data, dispatch)
//         }).catch(error => networkErrorHandler(error, dispatch))
//     }
// }
// export const logOut = () => {
//     return (dispatch: Dispatch) => {
//         dispatch(setStatus('loading'))
//         API.auth().then(data => {
//             if (!data.resultCode) {
//                 dispatch(authToggle())
//                 dispatch(setStatus('success'))
//             } else apiErrorHandler(data, dispatch)
//         }).catch(error => networkErrorHandler(error, dispatch))
//     }
// }