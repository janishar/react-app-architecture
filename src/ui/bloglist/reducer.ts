import { blogsLatestAction, removeMessage } from './actions';
import { Action, Message } from 'app-types';
import { Blog } from '@ui/blogpage/reducer';

export type State = {
  data: Array<Blog> | null;
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
    case removeMessage.type:
      return {
        ...state,
        message: null,
      };
    case blogsLatestAction.requesting.type:
      return {
        ...state,
        isFetching: true,
      };
    case blogsLatestAction.failure.type:
      return {
        ...state,
        isFetching: false,
        message: {
          type: 'error',
          text: 'No more blogs',
        },
      };
    case blogsLatestAction.success.type:
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
