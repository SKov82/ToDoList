import React from "react";
import {FilterType} from '../App'

type ToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function ToDoList(props: ToDoListType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" defaultChecked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={ () => props.removeTask(el.id) }> Удалить </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={ () => props.changeFilter('all')}>Все</button>
                <button onClick={ () => props.changeFilter('active')}>Активные</button>
                <button onClick={ () => props.changeFilter('done')}>Завершенные</button>
            </div>
        </div>
    );
}