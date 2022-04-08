import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from '../App'

type ToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function ToDoList(props: ToDoListType) {
    const [taskTitle, setTaskTitle] = useState('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {setTaskTitle(event.currentTarget.value)}}
                    onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            props.addTask(taskTitle)
                            setTaskTitle('')
                        }
                    }}/>
                <button onClick={() => {
                    if (taskTitle) {
                        props.addTask(taskTitle)
                        setTaskTitle('')
                    }
                }}>
                    +
                </button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" defaultChecked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}> Удалить</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>Все</button>
                <button onClick={() => props.changeFilter('active')}>Активные</button>
                <button onClick={() => props.changeFilter('done')}>Завершенные</button>
            </div>
        </div>
    );
}