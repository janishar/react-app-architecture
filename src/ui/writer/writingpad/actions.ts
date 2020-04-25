import { AsyncAction, Dispatch, StateFetcher, BlogDetail, Blog } from 'app-types';
import { actionCreator, networkActionsCreator } from '@utils/creator';
import { validateToken } from '@utils/appUtils';
import { protectedRequest } from '@utils/network';

export const showMessage = actionCreator<string>('WRITING_PAD_SHOW_MESSAGE');
export const removeMessage = actionCreator<null>('WRITING_PAD_REMOVE_MESSAGE');
export const clearPad = actionCreator<string>('WRITING_PAD_CLEAR');
export const hydratePad = actionCreator<Partial<BlogDetail>>('WRITING_PAD_HYDRATE');
export const editBlog = actionCreator<Partial<BlogDetail>>('WRITING_PAD_BLOG_UPDATE');

export const blogActions = networkActionsCreator<BlogDetail>('WRITING_PAD_BLOG');
export const createBlogActions = networkActionsCreator<BlogDetail>('WRITING_PAD_BLOG_CREATE');
export const saveBlogActions = networkActionsCreator<BlogDetail>('WRITING_PAD_BLOG_SAVE');
export const submitBlogActions = networkActionsCreator<null>('WRITING_PAD_BLOG_SUBMIT');
export const withdrawBlogActions = networkActionsCreator<null>('WRITING_PAD_BLOG_WITHDRAW');

export const fetchBlog = (blog: Blog): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(blogActions.requesting.action());
    const response = await protectedRequest<null, BlogDetail>(
      {
        url: 'writer/blog/id/' + blog._id,
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

export const createBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(createBlogActions.requesting.action());
    const response = await protectedRequest<BlogDetail, BlogDetail>(
      {
        url: 'writer/blog',
        method: 'POST',
        data: { ...blog },
      },
      token,
      dispatch,
    );
    dispatch(createBlogActions.success.action(response));
  } catch (e) {
    dispatch(createBlogActions.failure.action(e));
  }
};

export const saveBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(saveBlogActions.requesting.action());
    const response = await protectedRequest<BlogDetail, BlogDetail>(
      {
        url: 'writer/blog/id/' + blog._id,
        method: 'PUT',
        data: { ...blog },
      },
      token,
      dispatch,
    );
    dispatch(saveBlogActions.success.action(response));
  } catch (e) {
    dispatch(saveBlogActions.failure.action(e));
  }
};

export const submitBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(submitBlogActions.requesting.action());
    const response = await protectedRequest<null, null>(
      {
        url: 'writer/blog/submit/' + blog._id,
        method: 'PUT',
      },
      token,
      dispatch,
    );
    dispatch(submitBlogActions.success.action(response));
  } catch (e) {
    dispatch(submitBlogActions.failure.action(e));
  }
};

export const withdrawBlog = (blog: BlogDetail): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    const token = validateToken(getState());
    dispatch(withdrawBlogActions.requesting.action());
    const response = await protectedRequest<null, null>(
      {
        url: 'writer/blog/withdraw/' + blog._id,
        method: 'PUT',
      },
      token,
      dispatch,
    );
    dispatch(withdrawBlogActions.success.action(response));
  } catch (e) {
    dispatch(withdrawBlogActions.failure.action(e));
  }
};
