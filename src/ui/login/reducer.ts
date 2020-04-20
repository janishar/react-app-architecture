import { ActionTypes } from './actions';
import { User } from 'app-types';

export type State = {
    data: {
        user: User;
        tokens: {
            accessToken: string;
        };
    } | null;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isLoggedIn: boolean;
    isForcedLogout: boolean;
    isRedirectHome: boolean;
    message: string | null;
};

export const defaultState: State = {
    data: null,
    isLoggingIn: false,
    isLoggingOut: false,
    isLoggedIn: false,
    isForcedLogout: false,
    isRedirectHome: false,
    message: null,
};

const reducer = (state: State = defaultState, action: ActionTypes): State => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
