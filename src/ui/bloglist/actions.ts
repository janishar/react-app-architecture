import { AsyncAction, Dispatch } from 'app-types';
import { networkActionsCreator, actionCreator } from '@utils/creator';
import { publicRequest } from '@utils/network';
import { Blog } from '@ui/blogpage/reducer';

export const removeMessage = actionCreator<null>('CLEAR_BLOGS_MESSAGE');

export const blogsLatestAction = networkActionsCreator<Array<Blog>>('LATEST_BLOGS');

/**
 * @todo: implement pagination based ui
 */
export const fetchLatestBlogs = (): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(blogsLatestAction.requesting.action());
    const response = await publicRequest<null, Array<Blog>>({
      url: 'blogs/latest',
      method: 'GET',
      params: { pageNumber: 1, pageItemCount: 1000 },
    });
    dispatch(blogsLatestAction.success.action(response));
  } catch (e) {
    dispatch(blogsLatestAction.failure.action(e));
  }
};
