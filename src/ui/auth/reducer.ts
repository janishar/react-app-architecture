import { ActionTypes, UPDATE_AUTH_DATA, FORCED_LOGOUT } from './actions';
import { AuthData } from 'app-types';

export type State = {
    data: AuthData | null;
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

const reducer = (state: State = defaultState, { type, payload }: ActionTypes): State => {
    switch (type) {
        case UPDATE_AUTH_DATA:
            if (!payload) return { ...defaultState };
            return {
                ...state,
                data: payload,
                isLoggedIn: true,
                isForcedLogout: false,
            };
        case FORCED_LOGOUT:
            return { ...state, isForcedLogout: true };
        default:
            return state;
    }
};

export default reducer;
