export const EditReducer = (state: boolean, action: GeneralType) => {
    switch (action.type) {
        case 'ON-DOUBLE-CLICK-EDIT': {
            return true
        }
        case 'ON-BLUR-EDIT': {
            return false
        }
        default: return state
    }
}

type GeneralType = onDoubleClickEditACType
| onBlurEditACType

type onDoubleClickEditACType = ReturnType<typeof onDoubleClickEditAC>
export const onDoubleClickEditAC = () => {
    return {
        type: 'ON-DOUBLE-CLICK-EDIT',
        preload: {}
    } as const
}

type onBlurEditACType = ReturnType<typeof onBlurEditAC>
export const onBlurEditAC = () => {
    return {
        type: 'ON-BLUR-EDIT',
        preload: {}
    } as const
}

