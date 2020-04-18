import { Action as ReduxAction, Dispatch as ReduxDispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';

export declare interface Action {
	type: string;
}

export type Dispatch = ReduxDispatch<ReduxAction<Action>>;

export type AsyncAction = ThunkAction<void, RootState, unknown, ReduxAction<string>>;

declare global {
	interface Window {
		__PRELOADED_STATE__: any;
	}
}
