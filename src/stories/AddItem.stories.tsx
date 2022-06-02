import React from 'react';
import {AddItem} from '../components/AddItem';
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItem Component',
    component: AddItem,
}

const addItemCallback = action('add new item')

export const AddItemStories = (props: any) => {
    return <AddItem defaultTitle={'Новый заголовок'}
                    addItem={addItemCallback}
    />
}
