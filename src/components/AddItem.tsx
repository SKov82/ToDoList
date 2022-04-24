import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemType = {
    addItem: (title: string) => void
    defaultTitle: string
}

export function AddItem({addItem, defaultTitle}: AddItemType) {
    const [title, setTitle] = useState<string>(defaultTitle)
    const [error, setError] = useState<string>('')

    function addHandler() {
        if (title.trim()) {
            addItem(title.trim())
            setTitle(defaultTitle)
        } else {
            setError('Field is required')
        }
    }

    return (
        <>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       setTitle(event.currentTarget.value)
                       setError('')
                   }}
                   onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                       if (event.key === 'Enter') addHandler()
                   }}
                   onBlur={ () => addItem('') }
                   autoFocus
            />

            {addItem.name !== 'changeEditMode'
            ? <button onClick={addHandler}>+</button>
            : ''}

            {error && <div className={'error-message'}>{error}</div>}
        </>
    )
}