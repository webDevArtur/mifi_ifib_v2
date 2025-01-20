import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

const key = "authToken";
const refreshKey = "refreshToken";

const getAccessToken = (): string | null => {
  return localStorage.getItem(key);
};

const setAccessToken = (token: string) => {
  localStorage.setItem(key, token);
};

const getRefreshToken = (): string => {
  const token = localStorage.getItem(refreshKey);
  if (token) {
    return token;
  }
  throw new Error("Рефреш токен отсутствует");
};

const setRefreshToken = (token: string) => {
  localStorage.setItem(refreshKey, token);
};

const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post("https://medphysicists.mephi.ru/api/v1/user/auth/token/refresh/", {
      refresh: getRefreshToken(),
    });
    const { access, refresh } = response.data;
    setAccessToken(access);
    setRefreshToken(refresh);
    return access;
  } catch (error) {
    localStorage.removeItem(key);
    localStorage.removeItem(refreshKey);

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    throw new Error("Необходимо авторизоваться");
  }
};

export const configureAxios = () => {
  axios.defaults.baseURL = "/api";
  axios.defaults.timeout = Infinity;
  axios.defaults.responseType = "json";

  axios.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (
      token
    ) {
      const headers = new AxiosHeaders(config.headers);
      headers.set("Authorization", `Bearer ${token}`);
      config.headers = headers;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401 && !axiosError.config?.url?.includes("/auth/token/refresh")) {
        try {
          const newToken = await refreshToken();
          if (axiosError.config) {
            const headers = new AxiosHeaders(axiosError.config.headers);
            headers.set("Authorization", `Bearer ${newToken}`);
            axiosError.config.headers = headers;

            return axios(axiosError.config);
          }
        } catch (refreshError) {
          throw refreshError;
        }
      }

      if (axiosError.response?.status === 403) {
        const accessToken = getAccessToken();
        window.location.href = `/registration/confirmation/${accessToken}`;
        throw new Error("У вас нет доступа к этой странице");
      }

      return Promise.reject(error);
    }
  );
};

export const api = async <T>(
  url: string,
  params: Partial<AxiosRequestConfig> = {},
  skipErrorHandling = false
): Promise<T> => {
  try {
    const response = await axios(url, params);
    return response.data as T;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && !skipErrorHandling) {
      switch (axiosError.response.status) {
        case 403:
          throw new Error("У вас нет доступа к этой странице");
        case 404:
          throw new Error("Страница не найдена");
        case 500:
          throw new Error("Ошибка подключения к серверу");
        default:
          throw error;
      }
    }
    throw error;
  }
};
