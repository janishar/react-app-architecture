import { AsyncAction, Dispatch, Blog } from 'app-types';
import { networkActionsCreator, actionCreator } from '@utils/creator';
import { publicRequest } from '@utils/network';

export const removeMessage = actionCreator<null>('CLEAR_BLOGS_MESSAGE');
export const blogsLatestActions = networkActionsCreator<Array<Blog>>('LATEST_BLOGS');

/**
 * @todo: implement pagination based ui
 */
export const fetchLatestBlogs = (): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(blogsLatestActions.requesting.action());
    const response = await publicRequest<null, Array<Blog>>({
      url: 'blogs/latest',
      method: 'GET',
      params: { pageNumber: 1, pageItemCount: 1000 },
    });
    dispatch(blogsLatestActions.success.action(response));
  } catch (e) {
    dispatch(blogsLatestActions.failure.action(e));
  }
};
