import React, {useCallback, useState} from 'react';
import {AddItem} from './AddItem';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
    onClick: () => void
}

export const EditableSpan = React.memo(({title, onChange, onClick}: EditableSpanType) => {
    let [editMode, setEditMode] = useState<boolean>(false)

    const changeEditMode = useCallback((newTitle: string) => {
        setEditMode(!editMode)
        if (newTitle && newTitle !== title) {
            onChange(newTitle)
        }
    }, [editMode, title, onChange])

    return (
        editMode
            ? <AddItem addItem={changeEditMode} defaultTitle={title} />
            : <>
                <span onDoubleClick={ () => changeEditMode('') }>{title}</span>
                <IconButton onClick={onClick}
                            color={'primary'}
                            size={'small'}
                            sx={{position: 'absolute', right: -7}}
                >
                    <DeleteIcon fontSize={'small'}/>
                </IconButton>
            </>
    )
} )