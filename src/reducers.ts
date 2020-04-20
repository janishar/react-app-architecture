import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer, { State as AppState } from '@ui/app/reducer';
import loginReducer, { State as LoginState } from '@ui/login/reducer';

export type RootState = {
    appState: AppState;
    authState: LoginState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
    appState: appReducer,
    authState: loginReducer,
});

export default rootReducer;
