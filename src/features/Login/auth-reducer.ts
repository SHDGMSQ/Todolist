import {
    setAppErrorAC,
    setAppStatusAC,
} from '../../app/app-reducer';
import {AppThunk} from '../../app/store';
import {AuthAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {AxiosError} from 'axios';

const initialState = {
    isLoggedIn: false
};
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};
// actions
export const setIsLoggedInAC = (value: boolean)=>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const);

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    AuthAPI.login(data)
        .then(res => {
            debugger
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
};

// types
export type AuthReducerActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>

