import {Dispatch} from 'redux';
import {API} from '../api/api';
import {apiErrorHandler, networkErrorHandler} from '../utils/error-utils';

export type StatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitStateType = {
    status: StatusType
    error: string | null
    isLoggedIn: boolean
    isInit: boolean
}
const appInitState: AppInitStateType = {
    status: 'idle',
    error: null,
    isLoggedIn: false,
    isInit: false,
}
export const appReducer = (state: AppInitStateType = appInitState, action: AppActionType): AppInitStateType => {
    switch (action.type) {
        case 'SET_STATUS':
            return {...state, status: action.status}
        case 'SET_ERROR':
            return {...state, error: action.error}
        case 'AUTH_TOGGLE':
            return {...state, isLoggedIn: !state.isLoggedIn}
        case 'INIT_APP':
            return {...state, isInit: true}
        default:
            return state
    }
}
export type AppActionType = ReturnType<typeof setStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof authToggle>
    | ReturnType<typeof initOn>

export const setStatus = (status: StatusType) => ({type: 'SET_STATUS', status} as const)
export const setError = (error: string | null) => ({type: 'SET_ERROR', error} as const)
export const authToggle = () => ({type: 'AUTH_TOGGLE'} as const)
export const initOn = () => ({type: 'INIT_APP'} as const)

type AuthPropsType = {
    type: 'auth' | 'login' | 'logout'
    email?: string
    password?: string
    rememberMe?: boolean
}
export const authMe = ({type, email = '', password = '', rememberMe = false}: AuthPropsType): any => {
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
            .finally(() => dispatch(initOn()))
    }
}