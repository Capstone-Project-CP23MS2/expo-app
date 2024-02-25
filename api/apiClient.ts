import axios from "axios";

const API_URL: string = process.env.EXPO_PUBLIC_BASE_URL_API!;

// Set config defaults when creating the instance
const apiClient = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  // headers: {
  //   Accept: '*/*',
  //   'Content-Type': 'application/json',
  //   // withCredentials: true,
  // },
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

apiClient.interceptors.request.use(


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