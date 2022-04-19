import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from '../App'

type ToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string) => void
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function ToDoList(props: ToDoListType) {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                    className={error ? 'error' : ''}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setTaskTitle(event.currentTarget.value)
                        setError('')
                    }}
                    onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter' && taskTitle.trim()) {
                            props.addTask(taskTitle.trim(), props.id)
                            setTaskTitle('')
                        } else {
                            setError('Field is required')
                        }
                    }}/>
                <button onClick={() => {
                    if (taskTitle.trim()) {
                        props.addTask(taskTitle.trim(), props.id)
                        setTaskTitle('')
                    } else {
                        setError('Field is required')
                    }
                }}>
                    +
                </button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={() => props.changeStatus(el.id, props.id)}
                            />
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id, props.id)}> Удалить</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                >
                    Все
                </button>
                <button onClick={() => props.changeFilter('active')}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                >
                    Активные
                </button>
                <button onClick={() => props.changeFilter('done')}
                        className={props.filter === 'done' ? 'active-filter' : ''}
                >
                    Завершенные
                </button>
            </div>
        </div>
    );
}