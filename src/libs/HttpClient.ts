import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import Router from '~/constants/router';
import StatusCode from '~/constants/statusCode';
import storage from '~/utils/storage';
import { StorageKey } from '~/utils/storage/types';

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
    this.setupInterceptors();
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = storage.getToken();
      config.headers = config.headers || {};
      if (token) {
        config.headers['Auth-Token'] = `Bearer ${token}`;
      }
      config.headers.Accept = 'application/json';
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error?.response?.status === StatusCode.UNAUTHORIZED) {
          storage.removeStorage(StorageKey.TOKEN);
          window.location.replace(`/${Router.HOME}`);
          return;
        }

        return Promise.reject(error);
      }
    );
  }
}
