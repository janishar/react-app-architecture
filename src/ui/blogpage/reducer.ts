import { sendExample } from './actions';
import { Action } from 'app-types';

export type Author = {
  _id: string;
  name: string;
  profilePicUrl: string;
};

export type Blog = {
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
};

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
