import {v1} from 'uuid';
import {TasksListType} from '../App';
import {
    addTaskAC, addTasksArrayAC, changeStatusAC, changeTaskTitleAC,
    removeTaskAC, removeTasksArrayAC, tasksReducer
} from './tasks-reducer';

const [tdlId1, tdlId2] = [v1(), v1()]
const startState: TasksListType = {
    [tdlId1]: [
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ],
    [tdlId2]: [
        {id: v1(), title: "Хлеб", isDone: true},
        {id: v1(), title: "Молоко", isDone: true},
        {id: v1(), title: "Сок", isDone: false},
    ]
}

test('remove task', () => {
    const endState = tasksReducer(
        tasksReducer(startState, removeTaskAC(tdlId1, startState[tdlId1][0].id)),
        removeTaskAC(tdlId2, startState[tdlId2][1].id)
    )

    expect(endState[tdlId2].length).toBe(startState[tdlId2].length - 1)
    expect(endState[tdlId1].length).toBe(startState[tdlId1].length - 1)
    expect(endState[tdlId2].every(t => t.title !== "Молоко")).toBeTruthy()
    expect(endState[tdlId1].every(t => t.title !== "HTML/CSS")).toBeTruthy()
})

test('add task', () => {
    const endState = tasksReducer(startState, addTaskAC(tdlId1, 'NewTask'))

    expect(endState[tdlId1].length).toBe(startState[tdlId1].length + 1)
    expect(endState[tdlId2].length).toBe(startState[tdlId2].length)
    expect(endState[tdlId1][0].id).toBeDefined()
    expect(endState[tdlId1][0].title).toBe('NewTask')
    expect(endState[tdlId1][0].isDone).toBe(false)
})

test('change task title', () => {
    const endState = tasksReducer(
        startState, changeTaskTitleAC(tdlId1, startState[tdlId1][0].id, 'NewTitle')
    )

    expect(endState[tdlId1].length).toBe(startState[tdlId1].length)
    expect(endState[tdlId2].length).toBe(startState[tdlId2].length)
    expect(endState[tdlId1][0].title).toBe('NewTitle')
    expect(endState[tdlId2][0].title).toBe(startState[tdlId2][0].title)
    expect(endState[tdlId1][0].id).toBe(startState[tdlId1][0].id)
    expect(endState[tdlId1][0].isDone).toBe(startState[tdlId1][0].isDone)
})

test('change task status', () => {
    const endState = tasksReducer(
        tasksReducer(startState, changeStatusAC(tdlId2, startState[tdlId2][1].id)),
        changeStatusAC(tdlId1, startState[tdlId1][3].id)
    )

    expect(endState[tdlId1].length).toBe(startState[tdlId1].length)
    expect(endState[tdlId2].length).toBe(startState[tdlId2].length)
    expect(endState[tdlId1][3].title).toBe(startState[tdlId1][3].title)
    expect(endState[tdlId1][3].id).toBe(startState[tdlId1][3].id)
    expect(endState[tdlId1][3].isDone).toBe(!startState[tdlId1][3].isDone)
    expect(endState[tdlId1][3].isDone).toBeTruthy()
    expect(endState[tdlId2][1].title).toBe(startState[tdlId2][1].title)
    expect(endState[tdlId2][1].id).toBe(startState[tdlId2][1].id)
    expect(endState[tdlId2][1].isDone).toBe(!startState[tdlId2][1].isDone)
    expect(endState[tdlId2][1].isDone).toBeFalsy()
})

test('add empty array of tasks for new ToDoList', () => {
    const endState = tasksReducer(startState, addTasksArrayAC(v1()))

    expect(Object.keys(endState).length).toBe(Object.keys(startState).length + 1)
    expect(Object.values(endState).length).toBe(Object.values(startState).length + 1)
    expect(endState[tdlId1].length).toBe(startState[tdlId1].length)
    expect(endState[tdlId2].length).toBe(startState[tdlId2].length)
    expect(endState[Object.keys(endState)[0]].length).toBe(0)
    expect(endState[Object.keys(endState)[0]]).toEqual([])
    expect(endState[Object.keys(endState)[1]].length).toBe(startState[tdlId1].length)
    expect(Object.keys(endState)[2]).toBe(tdlId2)
})

test('delete array of tasks for removed ToDoList', () => {
    const endState = tasksReducer(startState, removeTasksArrayAC(tdlId1))

    expect(Object.keys(endState).length).toBe(Object.keys(startState).length - 1)
    expect(endState[tdlId1]).toBeUndefined()
})