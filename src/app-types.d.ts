import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';

declare interface Action<T = any> {
  readonly type: string;
  readonly payload?: T;
}

declare type Dispatch<T = any> = (_: Action<T>) => void;

declare type StateFetcher = () => RootState;

declare type AsyncAction = ThunkAction<void, RootState, unknown, ReduxAction<string>>;

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      colors: {
        blueLight: React.CSSProperties['color'];
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom: {
      colors: {
        blueLight: React.CSSProperties['color'];
      };
    };
  }
}

export type Role = {
  _id: string;
  code: string;
};

export type User = {
  _id: string;
  name: string;
  roles: Array<Role>;
  profilePicUrl?: string;
};

export type Message = {
  text: string;
  type: 'success' | 'warning' | 'error' | 'info';
};

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

export interface BlogDetail extends Blog {
  isSubmitted: boolean;
  isDraft: boolean;
  isPublished: boolean;
  draftText: string;
}
