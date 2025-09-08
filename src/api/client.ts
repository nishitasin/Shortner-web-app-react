import axios from 'axios';
import { Log } from '../middleware/logger';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  Log('frontend', 'info', 'auth', 'Authentication token set successfully.');
};

// Interceptor for handling token expiration and logging API errors
api.interceptors.response.use(
  (response) => {
    Log('frontend', 'info', 'api', `API call successful: ${response.config.url}`);
    return response;
  },
  (error) => {
    Log(
      'frontend',
      'error',
      'api',
      `API call failed: ${error.response?.status} - ${error.message}`
    );
    // In a production app, you might handle token refresh here.
    return Promise.reject(error);
  }
);
