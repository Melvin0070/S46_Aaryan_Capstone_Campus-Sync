import axios from 'axios';
import { getCookie, setCookie } from '../Components/cookies';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await axios.post('/users/token', { refreshToken });
        if (response.data.accessToken) {
          setCookie('accessToken', response.data.accessToken, 1); // Update access token in cookies
          originalRequest.headers.Authorization = response.data.accessToken;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        
        console.error('Error refreshing token:', error);
        // Handle logout or redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
