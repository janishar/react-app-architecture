import { AsyncAction, Dispatch, StateFetcher } from 'app-types';
import { networkActionsCreator, actionCreator } from '@utils/creator';
import { publicRequest, protectedRequest } from '@utils/network';
import { AuthData } from './reducer';
import { validateToken } from '@utils/appUtils';

export const updateAuthData = actionCreator<AuthData | null>('UPDATE_AUTH_DATA');

export const forceLogout = actionCreator<null>('FORCED_LOGOUT');

export const loginActions = networkActionsCreator<AuthData>('LOGIN');

export const logoutActions = networkActionsCreator<null>('LOGOUT');

export const removeMessage = actionCreator<null>('REMOVE_AUTH_MESSAGE');

export type LoginRequestBody = {
    email: string;
    password: string;
};

export const basicLogin = ({ email, password }: LoginRequestBody): AsyncAction => async (
    dispatch: Dispatch,
) => {
    try {
        dispatch(loginActions.requesting.action());
        const response = await publicRequest<LoginRequestBody, AuthData>({
            url: 'login/basic',
            method: 'POST',
            data: {
                email: email,
                password: password,
            },
        });
        dispatch(loginActions.success.action(response));
    } catch (e) {
        dispatch(loginActions.failure.action(e));
    }
};

export const logout = (): AsyncAction => async (dispatch: Dispatch, getState: StateFetcher) => {
    try {
        const token = validateToken(getState());
        dispatch(logoutActions.requesting.action());
        const response = await protectedRequest<null, null>(
            {
                url: 'logout',
                method: 'DELETE',
            },
            token,
            dispatch,
        );
        dispatch(logoutActions.success.action(response));
    } catch (e) {
        dispatch(logoutActions.failure.action(e));
    }
};
