import { sendExample } from './actions';
import { Action } from 'app-types';

export type State = {
  exampleVariable: string | null;
};

export const defaultState: State = {
  exampleVariable: null,
};

const reducer = (state: State = defaultState, { type, payload }: Action): State => {
  switch (type) {
    case sendExample.type:
      return {
        ...state,
        exampleVariable: payload,
      };
    default:
      return state;
  }
};

export default reducer;
