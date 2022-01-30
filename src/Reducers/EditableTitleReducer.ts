export const EditableTitleReducer = (state: string, action: GeneralType) => {
    switch (action.type) {
        case 'ON-DOUBLE-CLICK-TITLE': {
            return action.preload.title
        }
        case 'ON-CHANGE-INPUT-TITLE': {
            return action.preload.title
        }
        default: return state
    }
}
type GeneralType = onDoubleClickTitleACType
| onChangeInputTitleACType

type onDoubleClickTitleACType = ReturnType<typeof onDoubleClickTitleAC>
export const onDoubleClickTitleAC = (title: string) => {
    return {
        type: 'ON-DOUBLE-CLICK-TITLE',
        preload: {
            title
        }
    } as const
}

type onChangeInputTitleACType = ReturnType<typeof onChangeInputTitleAC>
export const onChangeInputTitleAC = (title: string) => {
    return {
        type: 'ON-CHANGE-INPUT-TITLE',
        preload: {
            title
        }
    } as const
}