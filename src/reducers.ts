import { combineReducers } from 'redux';
import appReducer, { State as AppState } from './ui/app/reducer';

export interface RootState {
	appState: AppState;
}

const rootReducer = combineReducers<RootState>({
	appState: appReducer,
});

export default rootReducer;
