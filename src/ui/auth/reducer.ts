import { updateAuthData, forceLogout, loginActions, logoutActions, removeMessage } from './actions';
import { Action, User, Message } from 'app-types';

export enum Roles {
  LEARNER = 'LEARNER',
  WRITER = 'WRITER',
  EDITOR = 'EDITOR',
}

export type AuthData = {
  user: User;
  tokens: {
    accessToken: string;
  };
};

export type State = {
  data: AuthData | null;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoggedIn: boolean;
  isForcedLogout: boolean;
  isRedirectHome: boolean;
  message: Message | null;
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
    case removeMessage.type: {
      return {
        ...state,
        message: null,
      };
    }
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
      };
    case loginActions.success.type:
      return {
        ...state,
        data: payload.data,
        isLoggingIn: false,
        isLoggedIn: true,
        isForcedLogout: false,
        message: { text: payload.message, type: 'success' },
      };
    case loginActions.failure.type:
      return {
        ...state,
        isLoggingIn: false,
        message: { text: payload.message, type: 'error' },
      };
    case logoutActions.requesting.type:
      return {
        ...state,
        isLoggingOut: true,
      };
    case logoutActions.success.type:
      return {
        ...state,
        data: null,
        isLoggingOut: false,
        isLoggedIn: false,
        isForcedLogout: false,
        message: { text: payload.message, type: 'success' },
      };
    case logoutActions.failure.type:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        isForcedLogout: false,
        message: { text: payload.message, type: 'error' },
      };
    default:
      return state;
  }
};

export default reducer;
