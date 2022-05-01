import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

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
            <TextField value={title}
                       onChange={ (event: ChangeEvent<HTMLInputElement>) => {
                           setTitle(event.currentTarget.value)
                           setError('')
                       }}
                       onKeyPress={ (event: KeyboardEvent<HTMLInputElement>) => {
                           if (event.key === 'Enter') addHandler()
                       }}
                       onBlur={ () => addItem('') }
                       autoFocus
                       label={defaultTitle ? defaultTitle : 'Новая задача'}
                       variant="outlined"
                       size={'small'}
                       error={!!error}
                       helperText={error}
            />

            {addItem.name !== 'changeEditMode'
            ? <IconButton onClick={addHandler} sx={{ marginLeft: "2px" }}>
                    <AddTaskIcon fontSize={'medium'} color={'primary'} />
              </IconButton>
            : ''}
        </>
    )
}