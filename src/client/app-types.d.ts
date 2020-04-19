import { Action as ReduxAction, Dispatch as ReduxDispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';

declare interface Action {
	type: string;
}

declare type Dispatch = ReduxDispatch<ReduxAction<Action>>;

declare type AsyncAction = ThunkAction<void, RootState, unknown, ReduxAction<string>>;

declare global {
	interface Window {
		__PRELOADED_STATE__: any;
	}
}
