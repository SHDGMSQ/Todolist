import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from '../../../../state/ReduxStoreProviderDecoration';
import {TaskStatuses, TodoTaskPriorities} from '../../../../api/todolists-api';


export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        changeTaskTitle: action('changeTaskStatus'),
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus')
    },
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});



TaskIsDoneStory.args = {

    task: {id: 'qwdqwd', title: 'JS', status: TaskStatuses.Completed, description: '',  todoListId: '1', order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
    todolistID: '1',

};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: 'qwdqwd', title: 'HTML', status: TaskStatuses.New, description: '',  todoListId: '1', order: 0, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: ''},
    todolistID: '1',
};


