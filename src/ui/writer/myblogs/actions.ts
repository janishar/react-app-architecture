import { AsyncAction, Dispatch, StateFetcher, BlogDetail } from 'app-types';
import { actionCreator, networkActionsCreator } from '@utils/creator';
import { validateToken } from '@utils/appUtils';
import { protectedRequest } from '@utils/network';

export const removeMessage = actionCreator<null>('WRITER_REMOVE_MESSAGE');
export const clearPage = actionCreator<null>('WRITER_CLEAR_PAGE');
export const deleteBlogActions = networkActionsCreator<BlogDetail>('WRITER_DELETE_BLOG');
export const draftBlogsActions = networkActionsCreator<Array<BlogDetail>>('WRITER_DRAFT_BLOGS');
export const submittedBlogsActions = networkActionsCreator<Array<BlogDetail>>(
  'WRITER_SUBMITTED_BLOGS',
);
export const publishedBlogsActions = networkActionsCreator<Array<BlogDetail>>(
  'WRITER_PUBLISHED_BLOGS',
);

export const fetchSubmittedBlogs = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => fetchBlogs(submittedBlogsActions, 'writer/blog/submitted/all', dispatch, getState);

export const fetchDraftBlogs = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => fetchBlogs(draftBlogsActions, 'writer/blog/drafts/all', dispatch, getState);

export const fetchPublishedBlogs = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => fetchBlogs(publishedBlogsActions, 'writer/blog/published/all', dispatch, getState);

const fetchBlogs = async (
  networkActions:
    | typeof submittedBlogsActions
    | typeof draftBlogsActions
    | typeof publishedBlogsActions,
  endoint: string,
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(networkActions.requesting.action());
    const response = await protectedRequest<null, Array<BlogDetail>>(
      {
        url: endoint,
        method: 'GET',
      },
      token,
      dispatch,
    );
    dispatch(networkActions.success.action(response));
  } catch (e) {
    dispatch(networkActions.failure.action(e));
  }
};

export const deleteBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(deleteBlogActions.requesting.action());
    const response = await protectedRequest<null, null>(
      {
        url: 'writer/blog/id/' + blog._id,
        method: 'DELETE',
      },
      token,
      dispatch,
    );
    dispatch(deleteBlogActions.success.action({ ...response, data: blog }));
  } catch (e) {
    dispatch(deleteBlogActions.failure.action(e));
  }
};
