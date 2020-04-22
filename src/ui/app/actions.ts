import { AsyncAction, Dispatch } from 'app-types';
import { publicRequest } from '@utils/network';
import { actionCreator } from '@utils/creator';

export const clearPageTitle = actionCreator<null>('CLEAR_PAGE_TITLE');

export const setPageTitle = actionCreator<string>('SET_PAGE_TITLE');

clearPageTitle.action();

export const testAsyncDispatch = (): AsyncAction => async (dispatch: Dispatch) => {
    // Example
    try {
        const response = await publicRequest({
            url: '/blogs/latest?pageNumber=1&pageItemCount=10',
            method: 'GET',
        });
    } catch (error) {}
};
