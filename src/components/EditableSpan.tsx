import React, {useCallback, useState} from 'react';
import {AddItem} from './AddItem';

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo(({title, onChange}: EditableSpanType) => {
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
            : <span onDoubleClick={ () => changeEditMode('') }>{title}</span>
    )
} )