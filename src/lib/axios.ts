import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiError {
  error: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => { // Use AxiosError and your custom ApiError type
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        console.warn('Unauthorized or Forbidden access. Redirecting to login...');
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(null); // Prevent further processing of the error
      }
    }
    return Promise.reject(error); // Re-throw other errors
  }
);

export default axiosInstance;