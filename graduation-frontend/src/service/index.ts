import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000";
const TIME_OUT = 1000 * 60;

export interface IResultData<T> {
  statusCode: number;
  code: number;
  data: T;
}

class LiRequest {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use((config) => {
      return config;
    });
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      return res;
    });
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
