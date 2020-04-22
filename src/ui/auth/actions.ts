import { Action, AuthData } from 'app-types';

export const UPDATE_AUTH_DATA = 'UPDATE_AUTH_DATA';
export const FORCED_LOGOUT = 'FORCED_LOGOUT';

export interface AuthDataAction extends Action {
    type: typeof UPDATE_AUTH_DATA;
    payload: AuthData | null;
}

export interface ForceLogoutAction extends Action {
    type: typeof FORCED_LOGOUT;
}

export type ActionTypes = AuthDataAction | ForceLogoutAction;

export const updateAuthDataAction = (authData: AuthData | null): AuthDataAction => ({
    type: UPDATE_AUTH_DATA,
    payload: authData,
});

export const forceLogout = (): ForceLogoutAction => ({
    type: FORCED_LOGOUT,
});
