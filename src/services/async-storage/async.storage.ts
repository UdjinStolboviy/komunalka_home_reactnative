import { IAsyncStorage } from "./async.storage.interface";
import { inject, injectable } from "inversify";

import {MMKV} from 'react-native-mmkv';
import { AsyncStorageKey } from "app/data/async-storege";
const storage = new MMKV();

@injectable()
export class AsyncStorage implements IAsyncStorage {
  public  save(key: string, value: string): void {
    storage.set(key, value);
  }
  public  get(key: string): string | null {
    const value: string | undefined = storage.getString(key)
    return value ?? null;
  }
  public  remove(key: string): void {
    storage.delete(key)
  }
  public  clearAll(): void {
    storage.clearAll();
  }

  public  clearKeys(keys: string[]): void {
      keys.map( key => {
        storage.delete(key);
      });
   
  }

  static saveBoolean(key: AsyncStorageKey, value: boolean): void {
    storage.set(key, value);
  }

  static getBoolean(key: AsyncStorageKey): boolean | null {
    const value: boolean | undefined = storage.getBoolean(key);
    return value ?? null;
  }

  static getString(key: AsyncStorageKey): string | null {
    const value: string | undefined = storage.getString(key)
    return value ?? null;
  }

  static saveString(key: AsyncStorageKey, value: string): void {
    storage.set(key, value);
  }

  static  getNumber(key: AsyncStorageKey): number | null {
    const value: number | undefined = storage.getNumber(key);
    return value ?? null;
  }

}
