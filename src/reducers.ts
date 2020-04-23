import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer, { State as AppState } from '@ui/app/reducer';
import authReducer, { State as AuthState } from '@ui/auth/reducer';

export type RootState = {
  appState: AppState;
  authState: AuthState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
  appState: appReducer,
  authState: authReducer,
});

export default rootReducer;
