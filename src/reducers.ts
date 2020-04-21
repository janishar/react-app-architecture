import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer, { State as AppState } from '@ui/app/reducer';

export type RootState = {
    appState: AppState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
    appState: appReducer,
});

export default rootReducer;
