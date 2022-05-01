import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";
import {v1} from 'uuid';
import {AddItem} from './components/AddItem';

export type FilterType = 'all' | 'active' | 'done'

type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}

type TasksListType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, toDoListId: string) {
        tasks[toDoListId] = tasks[toDoListId].filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, toDoListId: string) {
        if (title && toDoListId) {
            tasks[toDoListId] = [{
                id: v1(),
                title: title,
                isDone: false
            },
                ...tasks[toDoListId]
            ]
            setTasks({...tasks})
        }
    }

    function changeFilter(filter: FilterType, toDoListId: string) {
        let toDoList = toDoLists.find(toDoList => toDoList.id === toDoListId)
        if (toDoList) {
            toDoList.filter = filter
            setToDoLists([...toDoLists])
        }
    }

    function changeStatus(id: string, toDoListId: string) {
        let task: TaskType | undefined = tasks[toDoListId].find(task => id === task.id)
        if (task) {
            task.isDone = !task.isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(toDoListId: string, id: string, newTitle: string) {
        let task: TaskType | undefined = tasks[toDoListId].find(task => task.id === id)
        if (task) task.title = newTitle
        setTasks({...tasks})
    }

    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: v1(), title: 'What to learn ', filter: 'all'},
        {id: v1(), title: 'What to buy ', filter: 'active'},
        {id: v1(), title: 'Films to watch ', filter: 'done'},
    ])

    let [tasks, setTasks] = useState<TasksListType>({
        [toDoLists[0]?.id]: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Python", isDone: true},
            {id: v1(), title: "Django", isDone: true},
        ],
        [toDoLists[1]?.id]: [
            {id: v1(), title: "Хлеб", isDone: true},
            {id: v1(), title: "Молоко", isDone: false},
            {id: v1(), title: "Сок", isDone: false},
            {id: v1(), title: "Витамины", isDone: true},
        ],
        [toDoLists[2]?.id]: [
            {id: v1(), title: "Дориан Грей", isDone: true},
            {id: v1(), title: "Зеленая миля", isDone: true},
            {id: v1(), title: "Знакомьтесь, Джо Блэк", isDone: true},
        ]
    })

    function removeList(toDoListId: string) {
        let filteredToDoList = toDoLists.filter(el => el.id !== toDoListId)
        delete tasks[toDoListId]
        setToDoLists(filteredToDoList)
    }

    function addToDoList(title: string) {
        if (title) {
            let newToDoList: ToDoListType = {id: v1(), title: title, filter: 'all'}
            tasks[newToDoList.id] = []
            setToDoLists([newToDoList, ...toDoLists])
        }
    }

    function changeToDoListTitle(id: string, newTitle: string) {
        let toDoList: ToDoListType | undefined  = toDoLists.find(toDoList => toDoList.id === id)
        if (toDoList) toDoList.title = newTitle
        setToDoLists([...toDoLists])
    }

    return (
        <div className="App">
            <div><AddItem addItem={ (title: string) => addToDoList(title) }
                     defaultTitle={'Новый ToDoList'} /></div>

            {toDoLists.map(el => {
                let filteredTasks = tasks[el.id]
                if (el.filter === 'active') filteredTasks = tasks[el.id].filter(task => !task.isDone)
                if (el.filter === 'done') filteredTasks = tasks[el.id].filter(task => task.isDone)

                return <ToDoList
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={el.filter}
                    removeList={removeList}
                    changeToDoListTitle={changeToDoListTitle}
                />
                }
            )}
        </div>
    );
}

export default App;
