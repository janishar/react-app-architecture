import axios, { Method } from 'axios';
import { forceLogout } from '@ui/auth/actions';
import { Dispatch } from 'app-types';

const isLogEnabled = process.env.NODE_ENV !== 'production' && process.env.LOGGING == 'true';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'x-api-key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
  maxContentLength: 5 * 1000 * 1000, // bytes => 5 MB
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (isLogEnabled)
      console.log('Network Request:', `${config.baseURL}${config.url}`, config.method);
    return config;
  },
  async (error) => {
    if (isLogEnabled) console.error('Network Request:', error);
    throw error;
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (isLogEnabled) console.error('Network Response:', error);
    throw error && error.response && error.response.data;
  },
);

export type NetworkResponse<T extends object | null> = {
  readonly statusCode: string;
  readonly message: string;
  readonly data?: T;
};

export interface NetworkRequest<T extends object | null> {
  url: string;
  method: Method;
  data?: T;
  params?: object;
}

export interface NetworkAuthRequest<T extends object | null> extends NetworkRequest<T> {
  headers?: { Authorization: string };
}

/**
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function publicRequest<T extends object | null, R extends object | null>(
  request: NetworkRequest<T>,
): Promise<NetworkResponse<R>> {
  const { data } = await instance.request<NetworkResponse<R>>(request);
  return data;
}

/**
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function protectedRequest<T extends object | null, R extends object | null>(
  request: NetworkRequest<T>,
  token: string,
  dispatch: Dispatch,
): Promise<NetworkResponse<R>> {
  try {
    (request as NetworkAuthRequest<T>).headers = { Authorization: `Bearer ${token}` };
    const { data } = await instance.request<NetworkResponse<R>>(request);
    return data;
  } catch (e) {
    if (e.response && e.response.status === '401') dispatch(forceLogout.action());
    throw e;
  }
}
