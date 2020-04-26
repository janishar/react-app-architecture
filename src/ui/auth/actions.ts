import { AsyncAction, Dispatch, StateFetcher } from 'app-types';
import { networkActionsCreator, actionCreator } from '@utils/creator';
import { publicRequest, protectedRequest } from '@utils/network';
import { AuthData } from './reducer';
import { validateToken } from '@utils/appUtils';

export const removeMessage = actionCreator<null>('AUTH_REMOVE_MESSAGE');
export const updateAuthData = actionCreator<AuthData | null>('AUTH_UPDATE_DATA');
export const forceLogout = actionCreator<null>('AUTH_FORCED_LOGOUT');
export const loginActions = networkActionsCreator<AuthData>('AUTH_LOGIN');
export const logoutActions = networkActionsCreator<null>('AUTH_LOGOUT');

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type SignupRequestBody = {
  name: string;
  email: string;
  password: string;
  profilePicUrl?: string;
};

export const basicSignup = (body: SignupRequestBody): AsyncAction => async (dispatch: Dispatch) =>
  authRequest(body, 'signup/basic', dispatch);

export const basicLogin = (body: LoginRequestBody): AsyncAction => async (dispatch: Dispatch) =>
  authRequest(body, 'login/basic', dispatch);

const authRequest = async (
  body: SignupRequestBody | LoginRequestBody,
  endpoint: string,
  dispatch: Dispatch,
) => {
  try {
    dispatch(loginActions.requesting.action());
    const response = await publicRequest<SignupRequestBody | LoginRequestBody, AuthData>({
      url: endpoint,
      method: 'POST',
      data: body,
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
