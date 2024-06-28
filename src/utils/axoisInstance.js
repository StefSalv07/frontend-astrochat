// src/utils/axiosInstance.js
import axios from 'axios';
import { store } from '../app/store';
import { logoutUser } from '../features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logoutUser());
      // Optionally, you can redirect to the login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
