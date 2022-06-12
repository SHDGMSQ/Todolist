import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities, UpdateTaskModelType} from '../../api/todolists-api';
import {TaskStateType} from '../../trash/App';
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from './todolist-reducer';
import {AppRootStateType, AppThunk} from '../../app/store';


const initialState: TaskStateType = {};

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)};
        case 'ADD-TASK' :
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {...m, ...action.model} : m)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};

        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistID];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks};
        default:
            return state;
    }
};

//actions
export const removeTaskAC = (todolistID: string, id: string) =>
    ({type: 'REMOVE-TASK', todolistID, id} as const);
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const);
export const updateTaskAC = (todolistID: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistID, taskId, model}) as const;
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId}) as const;

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
        });
};
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId));
        });
};
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item));
        });
};
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(f => f.id === taskId);
        if (!task) {
            return;
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            ...domainModel
        };
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(res.data.data.item.todoListId, res.data.data.item.id, domainModel));
            });
    };

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string | null
    deadline?: string | null
}
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType

