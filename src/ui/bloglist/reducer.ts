import { blogsLatestActions, removeMessage } from './actions';
import { Action, Message, Blog } from 'app-types';

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
    case blogsLatestActions.requesting.type:
      return {
        ...state,
        isFetching: true,
      };
    case blogsLatestActions.failure.type:
      return {
        ...state,
        isFetching: false,
        message: {
          type: 'error',
          text: 'No more blogs',
        },
      };
    case blogsLatestActions.success.type:
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
