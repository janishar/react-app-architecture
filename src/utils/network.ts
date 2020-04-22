import axios, { Method } from 'axios';
import { forceLogout } from '@ui/auth/actions';
import { Dispatch } from 'app-types';

const isLogging = process.env.LOGGING === 'true';

const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 10000,
    headers: {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
    },
    maxContentLength: 2000,
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
    async (error) => {
        if (isLogging) console.error('Network Request:', error);
        throw error;
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (isLogging) console.error('Network Response:', error);
        throw error;
    },
);

export interface PublicRequest {
    url: string;
    method: Method;
    data?: any;
}

export interface ProtectedRequest extends PublicRequest {
    token: string;
}

export const publicRequest = async (request: PublicRequest) => {
    const { data } = await instance.request(request);
    return data;
};

export const protectedRequest = async (request: ProtectedRequest, dispatch: Dispatch) => {
    try {
        const { data } = await instance.request(request);
        return data;
    } catch (e) {
        if (e.response && e.response.status === '401') dispatch(forceLogout());
        throw e;
    }
};
