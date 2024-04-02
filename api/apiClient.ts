import axios from "axios";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,

} from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL_API;
const TOKEN_KEY = 'my-jwt';
// Set config defaults when creating the instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    requiresToken: true
  },
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const TEST_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMDUzNTM0NTUzOC1sdmpmMG5zZG83MmN2ZHA5bnRmbHU2N2QxZmFpNHRwdS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMwNTM1MzQ1NTM4LTA4a291Y2QxYjNmbDVmaGF1ZmJlbDBjNWtrZTJhcTlhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyMzE3MzMyODQ4NTYwMDcyODgyIiwiZW1haWwiOiJwb29yYWNoYWQyNTQ1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiUHVyYWNoZXQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSjY1OHdUUjFEYkxickhCZHEwUlY3UXZIZ2F2ZjUtRWtNM2psQXc0dGQ0RlE9czk2LWMiLCJnaXZlbl9uYW1lIjoiUHVyYWNoZXQiLCJsb2NhbGUiOiJ0aCIsImlhdCI6MTcxMDY3NTc0MiwiZXhwIjoxNzEwNjc5MzQyfQ.cHVWpN_E-wn3bxylTr_wXyKMidygrbDnzelff-WhS2rnjQI5vNO2tKgDxbA-XfjrRNegEVmlgQQvk6NL1vIc6AZSE2KTPmvFdoGTfkNyPQ1rqetJFe_SXz557gvCo9YtqA0E0G5fmKaTOA0J10-wsGjskaJIZJcY4Lg3okZkX3wuzOFuQSMRytB5meDDgsa8l9ZQ6850QbrlTa55xiJB4VPFDM8GzhXUcpfMMhWTNp6o6gV2w1VbS7DJBfYzIydXbv3uBk6dTKOU0BJwxKlgEAypjRjyynMcry6JwK7iBWQaieS6XHBVaTo0POmx_30psCDnnIGN7yaPQttW4ipw4g';

apiClient.interceptors.request.use(
  async (config) => {
    // const { idToken } = await GoogleSignin.getTokens();
    // if (!config.headers.requiresToken) return config;
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    // const token = TEST_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      console.error("Other Error:", error);
      return Promise.reject(error);
    }

    if (error.request) {
      console.error("Request Error:", error);
      return Promise.reject(error);
    }

    if (error.response) {
      console.error("Response Error:", error);
      return Promise.reject(error);
    }

    console.error("Unknown Error:", error);
    return Promise.reject({
      message: "Unknown Error",
    });
  },
);

export default apiClient;