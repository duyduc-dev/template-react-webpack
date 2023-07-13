import Axios, { AxiosRequestConfig } from 'axios';

import Router from '~/constants/router';
import StatusCode from '~/constants/statusCode';
import storage from '~/utils/storage';
import { StorageKey } from '~/utils/storage/types';

function authRequestInterceptor<T>(config: AxiosRequestConfig<T>) {
  const token = storage.getToken();
  config.headers = config.headers || {};
  if (token) {
    config.headers['Auth-Token'] = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: '',
});

axios.interceptors.request.use(authRequestInterceptor as never);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    if (error?.response?.status === StatusCode.UNAUTHORIZED) {
      storage.removeStorage(StorageKey.TOKEN);
      window.location.replace(`/${Router.LOGIN}`);
      return;
    }

    return Promise.reject(error);
  }
);
