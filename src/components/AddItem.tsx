import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemType = {
    id: string
    addTask: (title: string, toDoListId: string) => void
}

export function AddItem(props: AddItemType) {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    return (
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
                   }}
            />

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
    )
}