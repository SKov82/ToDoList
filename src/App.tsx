import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";

export type FilterType = 'all' | 'active' | 'done'

function App() {
    let toDoListTitle = '1-ый список'

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 0, title: "HTML", isDone: true},
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "TS", isDone: false},
        {id: 4, title: "React", isDone: false},
        {id: 5, title: "Python", isDone: true},
        {id: 6, title: "Django", isDone: true},
    ])

    function removeTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function addTask(title: string) {
        let newTasks = [{
            id: tasks.length,
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

    return (
        <div className="App">
            <ToDoList
                title={toDoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
