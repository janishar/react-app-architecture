import {
  removeMessage,
  submittedBlogsActions,
  draftBlogsActions,
  publishedBlogsActions,
  deleteBlogActions,
  blogActions,
} from './actions';
import { Action, Message, BlogDetail } from 'app-types';

export type BlogsData = {
  drafts?: Array<BlogDetail>;
  submissions?: Array<BlogDetail>;
  published?: Array<BlogDetail>;
};

export type State = {
  data: BlogsData | null;
  blog: BlogDetail | null;
  isFetchingBlog: boolean;
  isDeletingBlog: boolean;
  isFetchingDrafts: boolean;
  isFetchingSubmissions: boolean;
  isFetchingPublished: boolean;
  message: Message | null;
};

export const defaultState: State = {
  data: null,
  blog: null,
  isFetchingBlog: false,
  isDeletingBlog: false,
  isFetchingDrafts: false,
  isFetchingSubmissions: false,
  isFetchingPublished: false,
  message: null,
};

const reducer = (state: State = defaultState, { type, payload }: Action): State => {
  switch (type) {
    case removeMessage.type:
      return {
        ...state,
        message: null,
      };
    // Handle draft blogs data
    case draftBlogsActions.requesting.type:
      return {
        ...state,
        isFetchingDrafts: true,
      };
    case draftBlogsActions.failure.type:
      return {
        ...state,
        isFetchingDrafts: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case draftBlogsActions.success.type:
      return {
        ...state,
        isFetchingDrafts: false,
        data: {
          ...state.data,
          drafts: payload.data,
        },
      };
    // Handle submitted blogs data
    case submittedBlogsActions.requesting.type:
      return {
        ...state,
        isFetchingSubmissions: true,
      };
    case submittedBlogsActions.failure.type:
      return {
        ...state,
        isFetchingSubmissions: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case submittedBlogsActions.success.type:
      return {
        ...state,
        isFetchingSubmissions: false,
        data: {
          ...state.data,
          submissions: payload.data,
        },
      };
    // Handle published blogs data
    case publishedBlogsActions.requesting.type:
      return {
        ...state,
        isFetchingPublished: true,
      };
    case publishedBlogsActions.failure.type:
      return {
        ...state,
        isFetchingPublished: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case publishedBlogsActions.success.type:
      return {
        ...state,
        isFetchingPublished: false,
        data: {
          ...state.data,
          published: payload.data,
        },
      };
    // Handle blog delete
    case deleteBlogActions.requesting.type:
      return {
        ...state,
        isDeletingBlog: true,
      };
    case deleteBlogActions.failure.type:
      return {
        ...state,
        isDeletingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case deleteBlogActions.success.type:
      return {
        ...state,
        isDeletingBlog: false,
        data: {
          ...state.data,
          drafts: state.data?.drafts?.filter((blog) => blog._id !== payload.data._id),
        },
      };
    // Handle blog fetch for preview
    case blogActions.requesting.type:
      return {
        ...state,
        isFetchingBlog: true,
      };
    case blogActions.failure.type:
      return {
        ...state,
        isFetchingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case blogActions.success.type:
      return {
        ...state,
        isFetchingBlog: false,
        blog: payload.data,
      };
    default:
      return state;
  }
};

export default reducer;
