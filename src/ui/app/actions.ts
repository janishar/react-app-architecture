import { actionCreator } from '@utils/creator';

export const clearPageTitle = actionCreator<null>('CLEAR_PAGE_TITLE');

export const setPageTitle = actionCreator<string>('SET_PAGE_TITLE');

clearPageTitle.action();
