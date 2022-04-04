import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";

export type FilterType = 'all' | 'active' | 'done'

function App() {
    let toDoListTitle = '1-ый список'

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "TS", isDone: false},
        {id: 5, title: "React", isDone: false},
        {id: 6, title: "Python", isDone: true},
        {id: 7, title: "Django", isDone: true},
    ])

    function removeTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id))
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
            />
        </div>
    );
}

export default App;
