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

apiClient.interceptors.request.use(
  async (config) => {
    // const { idToken } = await GoogleSignin.getTokens();
    // if (!config.headers.requiresToken) return config;
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    console.log('🔑 token');
    console.log(config.auth);
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