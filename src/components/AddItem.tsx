import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemType = {
    addItem: (title: string) => void
    defaultTitle: string
}

export const AddItem = React.memo( ({addItem, defaultTitle}: AddItemType) => {
    const [title, setTitle] = useState<string>(defaultTitle)
    const [error, setError] = useState<string>('')

    const addHandler = useCallback(() => {
        if (title.trim()) {
            addItem(title.trim())
            setTitle(defaultTitle)
        } else {
            setError('Field is required')
        }
    }, [title, addItem, defaultTitle])

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
            ? <IconButton
                    onMouseDown={(e) => {e.preventDefault()}}
                    // onMouseDown перехватывает приоритет у onBlur и дает шанс отработать onClick
                    onClick={addHandler}
                    sx={{ marginLeft: "2px" }}
                >
                    <AddTaskIcon fontSize={'medium'} color={'primary'} />
              </IconButton>
            : ''}
        </>
    )
} )