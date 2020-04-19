import { Action, AsyncAction } from 'app-types';

export const CLEAR_PAGE_TITLE = 'CLEAR_PAGE_TITLE';
export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const UPDATE_APP_USER_NAME = 'UPDATE_APP_USER_NAME';

export interface ClearPageTitleAction extends Action {
	type: typeof CLEAR_PAGE_TITLE;
}

export interface SetPageTitleAction extends Action {
	type: typeof SET_PAGE_TITLE;
	payload: string | null;
}

export interface UpdateUserNameAction extends Action {
	type: typeof UPDATE_APP_USER_NAME;
	payload: string | null;
}

export type ActionTypes = ClearPageTitleAction | SetPageTitleAction | UpdateUserNameAction;

export const clearPageTitle = (): ClearPageTitleAction => ({
	type: CLEAR_PAGE_TITLE,
});

export const setPageTitle = (title: string): SetPageTitleAction => ({
	type: SET_PAGE_TITLE,
	payload: title,
});

export const updateUserName = (name: string): UpdateUserNameAction => ({
	type: UPDATE_APP_USER_NAME,
	payload: name,
});

export const testAsyncDispatch = (message: string): AsyncAction => async (dispatch) => {
	dispatch(setPageTitle(message));
};
