import {v1} from 'uuid';
import {
    addTDListAC, changeFilterAC, changeTDLTitleAC, removeTDListAC, SetTDL, TDLType, todolistReducer
} from './todolist-reducer';

const startState: TDLType[] = [
    {id: v1(), title: 'What to learn ', addedDate: '', order: 0, filter: 'all'},
    {id: v1(), title: 'What to buy ', addedDate: '', order: 1, filter: 'active'},
    {id: v1(), title: 'Films to watch ', addedDate: '', order: 2, filter: 'done'},
]

test('remove todolist', () => {
    const endState = todolistReducer(startState, removeTDListAC(startState[0].id))

    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].id).toBe(startState[1].id)
})

test('add todolist', () => {
    const endState = todolistReducer(startState, addTDListAC(v1(), 'NewTodoList'))

    expect(endState.length).toBe(startState.length + 1)
    expect(endState[1].id).toBe(startState[0].id)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].title).toBe('NewTodoList')
})

test('change todolist title', () => {
    const endState = todolistReducer(startState, changeTDLTitleAC(startState[1].id, 'NewTodoList'))

    expect(endState[1].id).toBe(startState[1].id)
    expect(endState[1].filter).toBe(startState[1].filter)
    expect(endState[1].title).toBe('NewTodoList')
    expect(endState.length).toBe(startState.length)
})

test('change todolist filter', () => {
    const endState = todolistReducer(startState, changeFilterAC(startState[1].id, 'all'))

    expect(endState[1].id).toBe(startState[1].id)
    expect(endState[1].filter).toBe('all')
    expect(endState[1].title).toBe(startState[1].title)
    expect(endState.length).toBe(startState.length)
})

test('set todolists to the state', () => {
    const action = SetTDL([
        {id: v1(), title: 'TDL from server', addedDate: '', order: 0},
    ])
    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[0].title).toBe('TDL from server')
    expect(endState.length).toBe(1)
})