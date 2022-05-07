import {v1} from 'uuid';
import {ToDoListType} from '../App';
import {todolistReducer} from './todolist-reducer';

test('remove todolist', () => {
    const startState: ToDoListType[] = [
        {id: v1(), title: 'What to learn ', filter: 'all'},
        {id: v1(), title: 'What to buy ', filter: 'active'},
        {id: v1(), title: 'Films to watch ', filter: 'done'},
    ]

    const endState = todolistReducer(startState, {
        type: 'REMOVE-TODOLIST', id: startState[0].id
    })

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(startState[1].id)
})

test('add todolist', () => {
    const startState: ToDoListType[] = [
        {id: v1(), title: 'What to learn ', filter: 'all'},
        {id: v1(), title: 'What to buy ', filter: 'active'},
        {id: v1(), title: 'Films to watch ', filter: 'done'},
    ]

    const endState = todolistReducer(startState, {
        type: 'ADD-TODOLIST', title: 'NewTodoList'
    })

    expect(endState.length).toBe(4)
    expect(endState[1].id).toBe(startState[0].id)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].title).toBe('NewTodoList')
})
