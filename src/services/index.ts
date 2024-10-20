import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

const key = "auth_token";

const getAccessToken = () => {
  const localStorageData = localStorage.getItem(key);

  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    return parsedData.access_token;
  }

  throw new Error("Токен просрочен или отсутствует");
};

export const configureAxios = () => {
  axios.defaults.baseURL = "/api";
  axios.defaults.timeout = Infinity;
  axios.defaults.responseType = "json";

  axios.interceptors.request.use((config) => {
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${getAccessToken()}`,
    );
    return config;
  });
};

export const api = <T>(
  url: string,
  params: Partial<AxiosRequestConfig> = {},
  skipErrorHandling = false,
): Promise<T> =>
  axios(url, params)
    .catch((error) => {
      const axiosError = error as AxiosError;

      if (axiosError.response && !skipErrorHandling) {
        switch (axiosError.response.status) {
          case 401:
            throw new Error("Необходимо авторизоваться");
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
    })
    .then((response) => response.data as T);
