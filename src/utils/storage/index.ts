/* eslint-disable no-console */

import { StorageKey } from './types';

class Storage {
  // token
  getToken(): any {
    return this.getStorage(StorageKey.TOKEN, {});
  }

  setToken(token: any): void {
    this.setStorage(StorageKey.TOKEN, token);
  }

  // set storage

  setStorage<T>(key: StorageKey, value: T): void {
    if (!window.localStorage) {
      return;
    }
    try {
      const lsValue = JSON.stringify(value);
      window.localStorage.setItem(key, lsValue);
    } catch (error) {
      console.error(`${key} LOCAL STORAGE SAVE ERROR`, error);
    }
  }

  getStorage<T = any>(key: StorageKey, defaultValue: T): T {
    if (typeof window !== 'undefined') {
      if (!window.localStorage) {
        return defaultValue;
      }
      const lsValue: string | null = window.localStorage.getItem(key);
      if (!lsValue) {
        return defaultValue;
      }
      try {
        const store: T = JSON.parse(lsValue) as T;
        if (!store) {
          return defaultValue;
        }
        return store;
      } catch (error) {
        console.error(`${key} LOCAL STORAGE PARSE ERROR`, error);
      }
    }

    return defaultValue;
  }

  removeStorage(key: StorageKey): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
}

const storage = new Storage();

export default storage;
