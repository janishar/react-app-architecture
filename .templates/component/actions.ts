import { Action, AsyncAction, Dispatch } from 'app-types';

export const EXAMPLE_ACTION = 'EXAMPLE_ACTION';

export interface ExampleAction extends Action {
	type: typeof EXAMPLE_ACTION;
	payload: string;
}

export type ActionTypes = ExampleAction; // club all actions here: ExampleAction1 | ExampleAction2 | ExampleAction3

export const sendExampleAction = (message: string): ExampleAction => ({
	type: EXAMPLE_ACTION,
	payload: message,
});

export const exampleAsyncDispatch = (message: string): AsyncAction => async (dispatch: Dispatch) => {
	dispatch(sendExampleAction(message));
};
