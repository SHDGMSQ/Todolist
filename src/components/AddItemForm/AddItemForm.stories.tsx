import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Title was added with button clicked'
        },
        disabled: {
            description: 'AddItemForm is disabled'
        }
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
   addItem: action('Title was added with button clicked')
};
export const AddItemFormDisabledStory = Template.bind({});

AddItemFormDisabledStory.args = {
   disabled: true
};


