import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000";
const TIME_OUT = 1000 * 60;

export interface IResultData<T> {
  statusCode: number;
  code: number;
  data: T;
}

interface Task {
  config: AxiosRequestConfig;
  resolve: Function;
}

let refreshing = false;
const queue: Task[] = [];

async function refreshToken() {
  const res = await axios.get(`${BASE_URL}/user/refresh`, {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });

  const { access_token, refresh_token } = res.data;

  localStorage.setItem("access_token", access_token || "");
  localStorage.setItem("refresh_token", refresh_token || "");

  return res;
}

class LiRequest {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
      }

      return config;
    });
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      async (error) => {
        let { data, config } = error.response;

        if (refreshing) {
          return new Promise((resolve) => {
            queue.push({
              config,
              resolve,
            });
          });
        }

        if (data.statusCode === 401 && !config.url.includes("/user/refresh")) {
          refreshing = true;

          const res = await refreshToken();

          refreshing = false;

          if (res.status === 200) {
            queue.forEach(({ config, resolve }) => {
              resolve(axios(config));
            });

            return axios(config);
          } else {
            alert("登录过期, 请重新登录!");
            return Promise.reject(res.data);
          }
        } else {
          return error.response;
        }
      }
    );
  }

  // request的T是指定响应结果res.data的类型
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T, AxiosResponse<T>>(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>({
      url,
      params,
      method: "GET",
    });
  }

  post<T = any>(url: string, data?: any, headers?: any): Promise<T> {
    return this.request<T>({ url, data, headers, method: "POST" });
  }
}

export default new LiRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
