import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecoration";


export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>;

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {};


