import { removeMessage, blogActions, clearPage } from './actions';
import { Action, Message } from 'app-types';

export interface Author {
  _id: string;
  name: string;
  profilePicUrl: string;
}

export interface Blog {
  _id: string;
  tags: Array<string>;
  likes: number;
  score: number;
  title: string;
  description: string;
  author: Author;
  blogUrl: string;
  imgUrl: string;
  publishedAt: string;
  text?: string;
}

export type State = {
  data: Blog | null;
  isFetching: boolean;
  message: Message | null;
};

export const defaultState: State = {
  data: null,
  isFetching: false,
  message: null,
};

const reducer = (state: State = defaultState, { type, payload }: Action): State => {
  switch (type) {
    case clearPage.type:
      return {
        ...defaultState,
      };
    case removeMessage.type:
      return {
        ...state,
        message: null,
      };
    case blogActions.requesting.type:
      return {
        ...state,
        isFetching: true,
      };
    case blogActions.failure.type:
      return {
        ...state,
        isFetching: false,
        message: {
          type: 'error',
          text: 'Please refresh the page',
        },
      };
    case blogActions.success.type:
      return {
        ...state,
        isFetching: false,
        data: payload.data,
      };
    default:
      return state;
  }
};

export default reducer;
