import { combineReducers } from 'redux';
import appReducer, { State as AppState } from '@ui/app/reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export interface RootState {
    appState: AppState;
}

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
    appState: appReducer,
});

export default rootReducer;
