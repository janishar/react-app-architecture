import { removeMessage, blogActions, clearPage } from './actions';
import { Action, Message, Blog } from 'app-types';

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
