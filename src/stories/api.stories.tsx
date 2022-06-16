import React, {useEffect, useState} from 'react';
import {API, TodoListType} from '../api/api';

export default {
    title: 'API Test',
    component: null,
}

export const GetTDL = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)

    useEffect( () => {
        API.getTDL().then(
            (data) => {
                setState(data)
            }
        )
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTDL = () => {
    const [state, setState] = useState<TodoListType | null>(null)

    useEffect( () => {
        API.createTDL( {title: 'Первый TDL'} ).then(
            (data) => {
                if (!data.resultCode) setState(data.data.item)
            }
        )
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}