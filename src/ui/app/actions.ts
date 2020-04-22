import { Action, AsyncAction, Dispatch } from 'app-types';
import { publicRequest } from '@utils/network';

export const CLEAR_PAGE_TITLE = 'CLEAR_PAGE_TITLE';
export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';

export interface ClearPageTitleAction extends Action {
    type: typeof CLEAR_PAGE_TITLE;
}

export interface SetPageTitleAction extends Action {
    type: typeof SET_PAGE_TITLE;
    payload: string | null;
}

export type ActionTypes = ClearPageTitleAction | SetPageTitleAction;

export const clearPageTitle = (): ClearPageTitleAction => ({
    type: CLEAR_PAGE_TITLE,
});

export const setPageTitle = (title: string): SetPageTitleAction => ({
    type: SET_PAGE_TITLE,
    payload: title,
});

export const testAsyncDispatch = (message: string): AsyncAction => async (dispatch: Dispatch) => {
    // Example
    try {
        const response = await publicRequest({
            url: '/blogs/latest?pageNumber=1&pageItemCount=10',
            method: 'GET',
        });
        console.log('testAsyncDispatch in', response);
    } catch (error) {
        console.log('testAsyncDispatch error', error);
    }
};
