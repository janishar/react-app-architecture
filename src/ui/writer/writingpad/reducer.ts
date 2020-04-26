import {
  clearPad,
  hydratePad,
  showMessage,
  removeMessage,
  editBlog,
  blogActions,
  createBlogActions,
  saveBlogActions,
  submitBlogActions,
  withdrawBlogActions,
} from './actions';
import { Action, Message, BlogDetail, Blog } from 'app-types';

export type State = {
  data: BlogDetail | null;
  hydrationBlog: Blog | null;
  isFetchingBlog: boolean;
  isSavingBlog: boolean;
  message: Message | null;
};

export const defaultState: State = {
  data: null,
  hydrationBlog: null,
  isFetchingBlog: false,
  isSavingBlog: false,
  message: null,
};

const reducer = (state: State = defaultState, { type, payload }: Action): State => {
  switch (type) {
    case hydratePad.type:
      return {
        ...defaultState,
        hydrationBlog: payload,
      };
    case clearPad.type:
      return {
        ...defaultState,
      };
    case showMessage.type:
      return {
        ...state,
        message: payload,
      };
    case removeMessage.type:
      return {
        ...state,
        message: null,
      };
    // Handle blog on change
    case editBlog.type:
      return {
        ...state,
        data: { ...state.data, ...payload },
      };
    // Handle blog fetch for edit
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
        data: payload.data,
      };
    // Handle blog create
    case createBlogActions.requesting.type:
      return {
        ...state,
        isSavingBlog: true,
      };
    case createBlogActions.failure.type:
      return {
        ...state,
        isSavingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case createBlogActions.success.type:
      return {
        ...state,
        isSavingBlog: false,
        data: payload.data,
        message: {
          type: 'success',
          text: payload.message,
        },
      };
    // Handle blog save
    case saveBlogActions.requesting.type:
      return {
        ...state,
        isSavingBlog: true,
      };
    case saveBlogActions.failure.type:
      return {
        ...state,
        isSavingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case saveBlogActions.success.type:
      return {
        ...state,
        isSavingBlog: false,
        data: payload.data,
        message: {
          type: 'success',
          text: payload.message,
        },
      };
    // Handle blog submit
    case submitBlogActions.requesting.type:
      return {
        ...state,
        isSavingBlog: true,
      };
    case submitBlogActions.failure.type:
      return {
        ...state,
        isSavingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case submitBlogActions.success.type:
      return {
        ...state,
        isSavingBlog: false,
        data: state.data ? { ...state.data, isSubmitted: true } : state.data,
        message: {
          type: 'success',
          text: payload.message,
        },
      };
    // Handle blog withdraw
    case withdrawBlogActions.requesting.type:
      return {
        ...state,
        isSavingBlog: true,
      };
    case withdrawBlogActions.failure.type:
      return {
        ...state,
        isSavingBlog: false,
        message: {
          type: 'error',
          text: payload.message,
        },
      };
    case withdrawBlogActions.success.type:
      return {
        ...state,
        isSavingBlog: false,
        data: state.data ? { ...state.data, isSubmitted: false } : state.data,
        message: {
          type: 'success',
          text: payload.message,
        },
      };
    default:
      return state;
  }
};

export default reducer;
