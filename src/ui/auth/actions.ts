import { AuthData } from 'app-types';
import { networkActionsCreator, actionCreator } from '@utils/creator';

export const updateAuthData = actionCreator<AuthData | null>('UPDATE_AUTH_DATA');

export const forceLogout = actionCreator<null>('FORCED_LOGOUT');

export const loginActions = networkActionsCreator('LOGIN');

export const logoutActions = networkActionsCreator('LOGOUT');
