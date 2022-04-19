import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'done'

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Python", isDone: true},
        {id: v1(), title: "Django", isDone: true},
    ])

    function removeTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function addTask(title: string) {
        let newTasks = [{
            id: v1(),
            title: title,
            isDone: false
            },
            ...tasks
        ]
        setTasks(newTasks)
    }

    let filteredTasks = tasks
    let [filter, setFilter] = useState<FilterType>('all')
    if (filter === 'active') filteredTasks = tasks.filter(task => !task.isDone)
    if (filter === 'done') filteredTasks = tasks.filter(task => task.isDone)

    function changeFilter(filter: FilterType) {
        setFilter(filter)
    }

    function changeStatus(id: string) {
        let task: TaskType | undefined = tasks.find(task => id === task.id)
        if (task) {
            task.isDone = !task.isDone
            setTasks([...tasks])
        }
    }

    let toDoLists = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'active'},
        {id: v1(), title: 'Films to watch ', filter: 'done'},
    ]

    return (
        <div className="App">
            {toDoLists.map(el => {
                return <ToDoList
                    key = {el.id}
                    title={el.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={filter}
                />
                }
            )}
        </div>
    );
}

export default App;
