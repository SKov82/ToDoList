import {ToDoListType} from '../App';
import {v1} from 'uuid';

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: Array<ToDoListType>, action: ActionType): ToDoListType[] => {
    let newState = [...state]

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            newState = newState.filter(el => el.id !== action.id)
            break
        case 'ADD-TODOLIST':
            newState = [
                {id: v1(), title: action.title, filter: 'all'},
                ...newState]
            break
        default:
            throw new Error('Unknown action type')
    }

    return newState
}