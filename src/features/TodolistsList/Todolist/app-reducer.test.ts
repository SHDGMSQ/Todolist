import {appReducer, InitialStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../../app/app-reducer';


let startState: InitialStateType;

beforeEach( () => {
    startState = {
        status: 'idle' as RequestStatusType,
        error: null as null | string
    };
} )

//test for APP/SET-STATUS
test('correct status should be set', () => {

    const action = setAppStatusAC('loading');

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading');
})

//test for APP/SET-ERROR
test('correct error should be set', () => {

    const action = setAppErrorAC('Some occurred error');

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('Some occurred error');
})