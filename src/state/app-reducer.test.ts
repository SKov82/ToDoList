import {AppInitStateType, appReducer, setError, setStatus} from './app-reducer';

let startState: AppInitStateType
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
    }
})

test('set error', () => {
    const endState = appReducer(startState, setError('newError'))

    expect(endState.error).toBe('newError')
    expect(endState.status).toBe('idle')
})

test('set status', () => {
    const endState = appReducer(startState, setStatus('failed'))

    expect(endState.status).toBe('failed')
    expect(endState.error).toBe(null)
})