import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {AppActionsType} from '../app/store';
import {ResponseType} from '../api/todolists-api';

export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'));
    }
    dispatch(setAppStatusAC('failed'));
}


export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message));
    dispatch(setAppStatusAC('failed'));
}