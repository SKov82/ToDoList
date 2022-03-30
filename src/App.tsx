import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";

function App() {
    let toDoListTitle = '1-ый список'

    let task_1: TaskType [] = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "TS", isDone: false},
    ]
    let task_2 = [
        {id: 1, title: "React", isDone: false},
        {id: 2, title: "Vue", isDone: true},
        {id: 3, title: "Angular", isDone: false},
    ]

    return (
        <div className="App">
            <ToDoList title={toDoListTitle} task={task_1} />
            <ToDoList title={"2-ой список"} task={task_2} />
            {/*<ToDoList title="3-ий список" />*/}
        </div>
    );
}

export default App;
