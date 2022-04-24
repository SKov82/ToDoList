import React, {KeyboardEvent, useState} from 'react';
import {AddItem} from './AddItem';

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan({title, onChange}: EditableSpanType) {
    let [editMode, setEditMode] = useState<boolean>(false)

    function changeEditMode(newTitle: string) {
        setEditMode(!editMode)
        if (newTitle && newTitle !== title) {
            onChange(newTitle)
        }
    }

    return (
        editMode
        ? <AddItem addItem={changeEditMode} defaultTitle={title} />
        : <span onDoubleClick={ () => changeEditMode('') }>{title}</span>
    )
}