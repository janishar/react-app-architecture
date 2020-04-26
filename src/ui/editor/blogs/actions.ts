import { AsyncAction, Dispatch, StateFetcher, BlogDetail } from 'app-types';
import { actionCreator, networkActionsCreator } from '@utils/creator';
import { validateToken } from '@utils/appUtils';
import { protectedRequest } from '@utils/network';

export const removeMessage = actionCreator<null>('EDITOR_REMOVE_MESSAGE');
export const clearPage = actionCreator<null>('EDITOR_CLEAR_PAGE');
export const clearBlog = actionCreator<null>('EDITOR_CLEAR_BLOG');
export const blogActions = networkActionsCreator<BlogDetail>('EDITOR_BLOG');
export const publishBlogActions = networkActionsCreator<BlogDetail>('EDITOR_PUBLISH_BLOG');
export const unpublishBlogActions = networkActionsCreator<BlogDetail>('EDITOR_UNPUBLISH_BLOG');
export const submittedBlogsActions = networkActionsCreator<Array<BlogDetail>>(
  'EDITOR_SUBMITTED_BLOGS',
);
export const publishedBlogsActions = networkActionsCreator<Array<BlogDetail>>(
  'EDITOR_PUBLISHED_BLOGS',
);

export const fetchSubmittedBlogs = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => fetchBlogs(submittedBlogsActions, 'editor/blog/submitted/all', dispatch, getState);

export const fetchPublishedBlogs = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => fetchBlogs(publishedBlogsActions, 'editor/blog/published/all', dispatch, getState);

const fetchBlogs = async (
  networkActions: typeof submittedBlogsActions | typeof publishedBlogsActions,
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

export const publishBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(publishBlogActions.requesting.action());
    const response = await protectedRequest<null, null>(
      {
        url: `editor/blog/publish/${blog._id}`,
        method: 'PUT',
      },
      token,
      dispatch,
    );
    dispatch(
      publishBlogActions.success.action({
        ...response,
        data: { ...blog, isPublished: true, isSubmitted: false },
      }),
    );
  } catch (e) {
    dispatch(publishBlogActions.failure.action(e));
  }
};

export const unpublishBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(unpublishBlogActions.requesting.action());
    const response = await protectedRequest<null, null>(
      {
        url: `editor/blog/unpublish/${blog._id}`,
        method: 'PUT',
      },
      token,
      dispatch,
    );
    dispatch(
      unpublishBlogActions.success.action({
        ...response,
        data: { ...blog, isPublished: false, isSubmitted: true },
      }),
    );
  } catch (e) {
    dispatch(unpublishBlogActions.failure.action(e));
  }
};

export const fetchBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(blogActions.requesting.action());
    const response = await protectedRequest<null, BlogDetail>(
      {
        url: 'editor/blog/id/' + blog._id,
        method: 'GET',
      },
      token,
      dispatch,
    );
    dispatch(blogActions.success.action(response));
  } catch (e) {
    dispatch(blogActions.failure.action(e));
  }
};
