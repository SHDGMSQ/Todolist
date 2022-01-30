export const ErrorReducer = (state: string | null, action: GeneralType) => {
    switch (action.type) {
        case 'ON-CHANGE-ERROR': {
            return null
        }
        case 'ADD-TASK-ITEM-FORM': {
                return 'Title is required'
        }
        default:
            return state
    }
}
type GeneralType = onChangeErrorACType
    | addTaskItemFormACType

type onChangeErrorACType = ReturnType<typeof onChangeErrorAC>
export const onChangeErrorAC = () => {
    return {
        type: 'ON-CHANGE-ERROR',
        preload: {}
    } as const
}

type addTaskItemFormACType = ReturnType<typeof addTaskItemFormAC>
export const addTaskItemFormAC = () => {
    return {
        type: 'ADD-TASK-ITEM-FORM',
        preload: {}
    } as const
}