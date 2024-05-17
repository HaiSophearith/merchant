import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import { OAUTH2_API_URL, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, PRIVATE_API_URL, PUBLIC_API_URL } from "./config";
import { getCookie, setCookie } from "./utils/cookies";

export const ACCESS_TOKEN_STORAGE_KEY = "ac";
export const REFRESH_TOKEN_STORAGE_KEY = "rf";

interface GetTokenRequest {
  getToken(refresh?: boolean): Promise<string>;
}

function withBearerAuth(axios: AxiosInstance): (config: GetTokenRequest) => AxiosInstance {
  return ({ getToken }) => {
    axios.interceptors.request.use(async function onFulfilled(config) {
      try {
        const token = await getToken();
        if (token) {
          config.headers.setAuthorization(`Bearer ${token}`);
        }
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }

      return config;
    });

    axios.interceptors.response.use(
      function onFulfilled(response) {
        return response;
      },
      async function onRejected(error: AxiosError) {
        if (error.response?.status === 401) {
          try {
            const token = await getToken(true);
            const originalRequest = error.config as AxiosRequestConfig;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return axios.request(originalRequest);
          } catch (e) {
            console.error(e);
            return Promise.reject(e);
          }
        }

        return Promise.reject(error);
      }
    );

    return axios;
  };
}

const oauth2Api = axios.create({
  baseURL: OAUTH2_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa(`${OAUTH2_CLIENT_ID}:${OAUTH2_CLIENT_SECRET}`)}`,
  },
});

export const publicApi = withBearerAuth(
  axios.create({
    baseURL: PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
)({
  getToken: async (refresh) => {
    const response = await oauth2Api.post("/oauth2/token", {
      grant_type: "client_credentials",
    });
    const { access_token: accessToken } = response.data;
    return accessToken;
  },
});

export const privateApi = withBearerAuth(
  axios.create({
    baseURL: PRIVATE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
)({
  getToken: async (refresh) => {
    const token = getCookie(ACCESS_TOKEN_STORAGE_KEY);
    if (!token || refresh) {
      const response = await publicApi.post("/admin/auth/refresh-token", {
        refreshToken: getCookie(REFRESH_TOKEN_STORAGE_KEY),
      });
      const { accessToken, refreshToken } = response.data;
      setCookie(ACCESS_TOKEN_STORAGE_KEY, accessToken, { sameSite: "strict" });
      setCookie(REFRESH_TOKEN_STORAGE_KEY, refreshToken, { sameSite: "strict" });
      return accessToken;
    }
    return token;
  },
});
