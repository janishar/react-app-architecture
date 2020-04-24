import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer, { State as AppState } from '@ui/app/reducer';
import authReducer, { State as AuthState } from '@ui/auth/reducer';
import blogReducer, { State as BlogListState } from '@ui/bloglist/reducer';

export type RootState = {
  appState: AppState;
  authState: AuthState;
  blogListState: BlogListState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
  appState: appReducer,
  authState: authReducer,
  blogListState: blogReducer,
});

export default rootReducer;
