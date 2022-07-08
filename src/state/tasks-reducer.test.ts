import {v1} from 'uuid';
import {TaskPriority, TaskStatus} from '../api/api';
import {
    addTaskAC, addTasksArrayAC, changeStatusAC, changeTaskTitleAC,
    removeTaskAC, removeTasksArrayAC, TasksListType, tasksReducer
} from './tasks-reducer';

const [tdlId1, tdlId2] = [v1(), v1()]
const startState: TasksListType = {
    [tdlId1]: [
        {
            id: v1(),
            title: "HTML/CSS",
            status: TaskStatus.Completed,
            todoListId: tdlId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "JS/TS",
            status: TaskStatus.Completed,
            todoListId: tdlId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "React",
            status: TaskStatus.InProgress,
            todoListId: tdlId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: false,
            description: ''
        },
    ],
    [tdlId2]: [
        {
            id: v1(),
            title: "Хлеб",
            status: TaskStatus.Completed,
            todoListId: tdlId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "Молоко",
            status: TaskStatus.Completed,
            todoListId: tdlId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: true,
            description: ''
        },
        {
            id: v1(),
            title: "Сок",
            status: TaskStatus.InProgress,
            todoListId: tdlId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriority.Middle,
            completed: false,
            description: ''
        },
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
    expect(endState[tdlId1][0].completed).toBe(false)
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
    expect(endState[tdlId1][0].completed).toBe(startState[tdlId1][0].completed)
})

test('change task status', () => {
    const endState = tasksReducer(
        tasksReducer(startState, changeStatusAC(tdlId2, startState[tdlId2][1].id)),
        changeStatusAC(tdlId1, startState[tdlId1][2].id)
    )

    expect(endState[tdlId1].length).toBe(startState[tdlId1].length)
    expect(endState[tdlId2].length).toBe(startState[tdlId2].length)
    expect(endState[tdlId1][2].title).toBe(startState[tdlId1][2].title)
    expect(endState[tdlId1][2].id).toBe(startState[tdlId1][2].id)
    expect(endState[tdlId1][2].completed).toBe(!startState[tdlId1][2].completed)
    expect(endState[tdlId1][2].completed).toBeTruthy()
    expect(endState[tdlId2][1].title).toBe(startState[tdlId2][1].title)
    expect(endState[tdlId2][1].id).toBe(startState[tdlId2][1].id)
    expect(endState[tdlId2][1].completed).toBe(!startState[tdlId2][1].completed)
    expect(endState[tdlId2][1].completed).toBeFalsy()
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