import React from 'react';
import {action} from '@storybook/addon-actions'
import AppWithRedux from '../AppWithRedux';

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
}

const someCallback = action('some action')

export const AppWithReduxStories = () => {
    return <AppWithRedux
    />
}
