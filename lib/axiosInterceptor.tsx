import axios from 'axios';
import { store } from '@/store/store';
import { logout, updateAccessToken } from '@/store/slices/authSlice';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // Always send httpOnly cookie with every request
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    console.log(error?.response?.data ?? error.message);
    // If the request is authorized and retried already => reject it
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Refresh the token using httpOnly cookie (sent via withCredentials)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/refresh/`, 
        {
          withCredentials: true,
        }
      );
      // Access token is returned from response as access
      const { access } = response.data;
      // Update the access token in the store
      store.dispatch(updateAccessToken(access));
      // Update the authorization header
      originalRequest.headers = {
        ...(originalRequest.headers || {}),
        Authorization: `Bearer ${access}`,
      };

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.log("Refresh token not valid, logging out");
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance; 