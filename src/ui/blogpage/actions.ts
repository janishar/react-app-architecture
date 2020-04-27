import { AsyncAction, Dispatch, Blog } from 'app-types';
import { actionCreator, networkActionsCreator } from '@utils/creator';
import { publicRequest } from '@utils/network';

export const removeMessage = actionCreator<null>('CLEAR_BLOG_PAGE_MESSAGE');
export const clearPage = actionCreator<string>('CLEAR_BLOG_PAGE');
export const blogActions = networkActionsCreator<Blog>('BLOG_PAGE');

export const fetchBlogByEndpoint = (endpoint: string): AsyncAction => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(blogActions.requesting.action());
    const response = await publicRequest<null, Blog>({
      url: 'blog/url',
      method: 'GET',
      params: {
        endpoint: endpoint,
      },
    });
    dispatch(blogActions.success.action(response));
  } catch (e) {
    dispatch(blogActions.failure.action(e));
  }
};
