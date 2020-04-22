import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';

declare interface Action {
    type: string;
    payload?: any;
}

declare type Dispatch = (_: Action) => void;

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

export type AuthData = {
    user: User;
    tokens: {
        accessToken: string;
    };
};
