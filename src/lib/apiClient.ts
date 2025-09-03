// lib/apiClient.ts
import { BackendResponse } from "@/app/model/GeneralModel";
import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
  // Use a relative path for Next.js API routes if you're proxying
  // or your full backend URL if you're calling it directly.
  // Given your current setup, you're proxying, so base URL is not strictly needed here
  // as calls will be like '/api/user/profile'.
  // However, if you explicitly set a baseURL, ensure it's your Next.js API root.
  // baseURL: '/api', // If all your Next.js API routes start with /api
  withCredentials: true, // Important for sending cookies (if directly hitting backend or if browser needs to confirm)
});

// Add a response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse<BackendResponse<unknown>>) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return { ...response, data: response.data.data };
    }

    return response;
  },
  (error) => {
    // Pass errors through
    return Promise.reject(error);
  }
);

export default apiClient;