import {AppInitStateType, appReducer, authToggle, initOn, setError, setStatus} from './app-reducer';

let startState: AppInitStateType
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isLoggedIn: false,
        isInit: false
    }
})

test('set error', () => {
    const endState = appReducer(startState, setError('newError'))

    expect(endState.error).toBe('newError')
    expect(endState.status).toBe('idle')
    expect(endState.isLoggedIn).toBeFalsy()
    expect(endState.isInit).toBeFalsy()
})

test('set status', () => {
    const endState = appReducer(startState, setStatus('failed'))

    expect(endState.status).toBe('failed')
    expect(endState.error).toBe(null)
    expect(endState.isLoggedIn).toBeFalsy()
    expect(endState.isInit).toBeFalsy()
})

test('auth (login/logout) toggle', () => {
    const endState = appReducer(startState, authToggle())

    expect(endState.status).toBe(startState.status)
    expect(endState.error).toBe(startState.error)
    expect(endState.isLoggedIn).toBeTruthy()
    expect(endState.isInit).toBeFalsy()
})

test('init app', () => {
    const endState = appReducer(startState, initOn())

    expect(endState.status).toBe(startState.status)
    expect(endState.error).toBe(startState.error)
    expect(endState.isLoggedIn).toBeFalsy()
    expect(endState.isInit).toBeTruthy()
})