import React from 'react';
import {FilterType} from '../App'
import {AddItem} from './AddItem';
import {EditableSpan} from './EditableSpan';

type ToDoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string) => void
    filter: FilterType
    removeList: (toDoListId: string) => void
    changeToDoListTitle: (toDoListId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function ToDoList(props: ToDoListType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeToDoListTitle}/>
                <button onClick={() => props.removeList(props.id)}>X</button>
            </h3>

            <AddItem addItem={addTask} defaultTitle={''} />

            <ul>
                {props.tasks.map(el => {
                    const onChangeHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.id, el.id, newTitle)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={() => props.changeStatus(el.id, props.id)}
                            />

                            <EditableSpan title={el.title} onChange={onChangeHandler} />

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

