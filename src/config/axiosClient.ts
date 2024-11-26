import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';
import { getCookie } from 'cookies-next';

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params: any) => {
    return queryString.stringify(
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => {
          if (value instanceof Array || value instanceof Object) {
            return [key, JSON.stringify(value)];
          } else {
            return [key, value];
          }
        }),
      ),
    );
  },
});

// Request interceptor to attach token from cookie
axiosClient.interceptors.request.use((config) => {
  // Lấy token từ cookie (client-side)
  if (typeof window !== 'undefined') {
    const token = getCookie('access_token');

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});
// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  async function (error: any) {
    return Promise.reject(error);
  },
);

export default axiosClient;
