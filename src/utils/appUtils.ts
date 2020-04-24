import { RootState } from '@core/reducers';
import { Roles } from '@ui/auth/reducer';
import { User } from 'app-types';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateToken = (rootState: RootState) => {
  const token = rootState?.authState?.data?.tokens?.accessToken;
  if (!token) throw new Error('Please Log in');
  return token;
};

export const convertToReadableDate = (date: string): string => formatDate(new Date(date));

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', { day: 'numeric' }) +
  ' ' +
  date.toLocaleDateString('en-US', { month: 'short' }) +
  ' ' +
  date.toLocaleDateString('en-US', { year: 'numeric' });

export const checkRole = (user: User | null | undefined, role: Roles): boolean =>
  user?.roles?.find((item) => item?.code === role) !== undefined;
