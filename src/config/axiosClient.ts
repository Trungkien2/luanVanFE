
import axios, { AxiosInstance } from 'axios';

import queryString from 'query-string';



const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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



// Request interceptor to attach token from the server-side
axiosClient.interceptors.request.use((config) => {
  // Attach token from cookie if available
  if (typeof window === 'undefined' && config.headers) {
    // In a server-side environment
    const cookies = require('cookie');
    const cookieHeader = config.headers['cookie'];

    if (cookieHeader) {
      const parsedCookies = cookies.parse(cookieHeader);
      const token = parsedCookies['access_token'];

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  }

  return config;
});
export default axiosClient;
