import {v1} from 'uuid';
import {ToDoListType} from '../App';
import {todolistReducer} from './todolist-reducer';

const startState: ToDoListType[] = [
    {id: v1(), title: 'What to learn ', filter: 'all'},
    {id: v1(), title: 'What to buy ', filter: 'active'},
    {id: v1(), title: 'Films to watch ', filter: 'done'},
]

test('remove todolist', () => {
    const endState = todolistReducer(startState, {
        type: 'REMOVE-TODOLIST', id: startState[0].id
    })

    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].id).toBe(startState[1].id)
})

test('add todolist', () => {
    const endState = todolistReducer(startState, {
        type: 'ADD-TODOLIST', title: 'NewTodoList'
    })

    expect(endState.length).toBe(startState.length + 1)
    expect(endState[1].id).toBe(startState[0].id)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].title).toBe('NewTodoList')
})

test('change todolist title', () => {
    const endState = todolistReducer(startState, {
        type: 'CHANGE-TITLE',
        id: startState[1].id,
        title: 'NewTodoList'
    })

    expect(endState[1].id).toBe(startState[1].id)
    expect(endState[1].filter).toBe(startState[1].filter)
    expect(endState[1].title).toBe('NewTodoList')
    expect(endState.length).toBe(startState.length)
})

test('change todolist filter', () => {
    const endState = todolistReducer(startState, {
        type: 'CHANGE-FILTER',
        id: startState[1].id,
        filter: 'all'
    })

    expect(endState[1].id).toBe(startState[1].id)
    expect(endState[1].filter).toBe('all')
    expect(endState[1].title).toBe(startState[1].title)
    expect(endState.length).toBe(startState.length)
})