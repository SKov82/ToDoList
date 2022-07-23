import {Dispatch} from 'redux';
import {API} from '../api/api';
import {apiErrorHandler, networkErrorHandler} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AppInitStateType = {
    status: string
    error: string
    isLoggedIn: boolean
    isInit: boolean
}
const appInitState = {
    status: 'idle',
    error: '',
    isLoggedIn: false,
    isInit: false,
}
const slice = createSlice({
    name: 'app',
    initialState: appInitState,
    reducers: {
        setStatus(state, action: PayloadAction<string>) { state.status = action.payload },
        setError(state, action: PayloadAction<string>) { state.error = action.payload },
        authToggle(state) { state.isLoggedIn = !state.isLoggedIn },
        initOn(state) { state.isInit = true },
    },
})
export const appReducer = slice.reducer
export const {setStatus, setError, authToggle, initOn} = slice.actions

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