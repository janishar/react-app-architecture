import { RootState } from '@core/reducers';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateToken = (rootState: RootState) => {
  const token = rootState?.authState?.data?.tokens?.accessToken;
  if (!token) throw new Error('Please Log in');
  return token;
};
