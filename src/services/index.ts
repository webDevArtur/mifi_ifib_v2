import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

const key = "authToken";

const getAccessToken = () => {
  const localStorageData = localStorage.getItem(key);

  if (localStorageData) {
    return localStorageData;
  }

  throw new Error("Токен просрочен или отсутствует");
};

export const configureAxios = () => {
  axios.defaults.baseURL = "/api";
  axios.defaults.timeout = Infinity;
  axios.defaults.responseType = "json";

  const publicAPIRoutes = [
    "/nuclear-medicine-intro/article/",
    "/nuclear-medicine-intro/equipment",
    "/nuclear-medicine-intro/films",
    "/nuclear-medicine-intro/podcasts",
  ];


  axios.interceptors.request.use((config) => {
    if (
      !config.url?.includes("login") &&
      !config.url?.includes("registration") &&
      !publicAPIRoutes.some((route) => config.url?.includes(route))
    ) {
      const token = getAccessToken();
      (config.headers as AxiosHeaders).set("Authorization", `Token ${token}`);
    }
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
