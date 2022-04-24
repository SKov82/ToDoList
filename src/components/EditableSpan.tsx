import React from 'react';

type EditableSpanType = {
    title: string
}

export function EditableSpan({title}: EditableSpanType) {
    return (
        <span>{title}</span>
    )
}