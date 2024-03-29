import {ResponseType} from '../api/api';
import {setError, setStatus} from '../state/app-reducer';
import {Dispatch} from 'redux';

export const apiErrorHandler = <D>(data: ResponseType, dispatch: Dispatch) => {
    data.messages.forEach(message => dispatch(setError(message)))
    dispatch(setStatus('failed'))
}
export const networkErrorHandler = (error: {message: string | null}, dispatch: Dispatch) => {
    dispatch(setError(error.message || 'Неизвестная ошибка!'))
    dispatch(setStatus('failed'))
}