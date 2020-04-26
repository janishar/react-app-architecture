import {
  removeMessage,
  submittedBlogsActions,
  publishedBlogsActions,
  publishBlogActions,
  unpublishBlogActions,
  blogActions,
  clearPage,
  clearBlog,
} from './actions';
import { Action, BlogDetail, Message } from 'app-types';

export type BlogsData = {
  submissions?: Array<BlogDetail>;
  published?: Array<BlogDetail>;
};

export type State = {
  data: BlogsData | null;
  blog: BlogDetail | null;
  isFetchingBlog: boolean;
  isPublishingBlog: boolean;
  isUnpublishingBlog: boolean;
  isFetchingSubmissions: boolean;
  isFetchingPublished: boolean;
  message: Message | null;
};

export const defaultState: State = {
  data: null,
  blog: null,
  isFetchingBlog: false,
  isPublishingBlog: false,
  isUnpublishingBlog: false,
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
    case clearPage.type:
      return {
        ...defaultState,
      };
    case clearBlog.type:
      return {
        ...state,
        blog: null,
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
    // Handle blog publish
    case publishBlogActions.requesting.type:
      return {
        ...state,
        isPublishingBlog: true,
      };
    case publishBlogActions.failure.type:
      return {
        ...state,
        isPublishingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case publishBlogActions.success.type: {
      const publishedBlog = state.data?.published?.filter((blog) => blog._id !== payload.data._id);
      return {
        ...state,
        isPublishingBlog: false,
        data: {
          ...state.data,
          submissions: state.data?.submissions?.filter((blog) => blog._id !== payload.data._id),
          published: publishedBlog ? [payload.data, ...publishedBlog] : [payload.data],
        },
      };
    }
    // Handle blog unpublish
    case unpublishBlogActions.requesting.type:
      return {
        ...state,
        isUnpublishingBlog: true,
      };
    case unpublishBlogActions.failure.type:
      return {
        ...state,
        isUnpublishingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case unpublishBlogActions.success.type:
      return {
        ...state,
        isUnpublishingBlog: false,
        data: {
          ...state.data,
          submissions: state.data?.submissions?.filter((blog) => blog._id !== payload.data._id),
          published: state.data?.published?.filter((blog) => blog._id !== payload.data._id),
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
