

export const TitleReducer = (state: string , action: GeneralType) => {
    switch (action.type) {
        case 'ON-CHANGE-INPUT':{
            return state = action.preload.newValue
        }
        case 'SET-TRIM-VALUE': {
            return ''
        }
        default: return state
    }
}
type GeneralType = onChangeInputACType
| setTrimValueACType

type onChangeInputACType = ReturnType<typeof onChangeInputAC>
export const onChangeInputAC = (newValue: string) => {
    return {
        type: 'ON-CHANGE-INPUT',
        preload: {
            newValue
        }
    } as const
}

type setTrimValueACType = ReturnType<typeof setTrimValueAC>
export const setTrimValueAC = () => {
    return {
        type: 'SET-TRIM-VALUE',
        preload: {}
    } as const
}