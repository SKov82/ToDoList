import React from 'react';
import {FilterType} from '../App'
import {AddItem} from './AddItem';

type ToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string) => void
    filter: FilterType
    removeList: (toDoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function ToDoList(props: ToDoListType) {
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={(event) => props.removeList(props.id)}>X</button>
            </h3>

            <AddItem id={props.id} addTask={props.addTask} />

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
