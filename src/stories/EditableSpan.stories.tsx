import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../Components/EditableSpan";


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            defaultValue: 'qwdqw',
            description: 'string'
        }
    },
    args: {
        title: 'rtgregw',
        onChangeTitle: action('onChangeTitle')
    }
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanWithStartValueStory = Template.bind({});

EditableSpanWithStartValueStory.args = {
  title: 'rtgregw'
};

export const EditableSpanWithOutStartValueStory = Template.bind({});

EditableSpanWithOutStartValueStory.args = {
    title: ''
};


