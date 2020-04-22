import { updateAuthData, forceLogout, loginActions, logoutActions } from './actions';
import { AuthData, Action } from 'app-types';

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

const reducer = (state: State = defaultState, { type, payload }: Action): State => {
    switch (type) {
        case updateAuthData.type:
            if (!payload) return { ...defaultState };
            return {
                ...state,
                data: payload,
                isLoggedIn: true,
                isForcedLogout: false,
            };
        case forceLogout.type:
            return { ...state, isForcedLogout: true };
        case loginActions.requesting.type:
            return {
                ...state,
                isLoggingIn: true,
                message: null,
            };
        case loginActions.success.type:
            return {
                ...state,
                data: payload.data,
                isLoggingIn: false,
                isLoggedIn: true,
                isForcedLogout: false,
                message: payload.message,
            };
        case loginActions.failure.type:
            return {
                ...state,
                message: payload.message,
                isLoggingIn: false,
            };
        case logoutActions.requesting.type:
            return {
                ...state,
                isLoggingOut: true,
                message: null,
            };
        case logoutActions.success.type:
            return {
                ...state,
                data: null,
                isLoggingOut: false,
                isLoggedIn: false,
                isForcedLogout: false,
                message: payload.message,
            };
        case logoutActions.failure.type:
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                isForcedLogout: false,
                message: payload.message,
            };
        default:
            return state;
    }
};

export default reducer;
