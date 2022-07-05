import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from './AsyncStorageKey';



export class AsyncStorageFacade {
  static async saveBoolean(key: AsyncStorageKey, value: boolean): Promise<void> {
    return this.saveString(key, JSON.stringify(value));
  }

  static async getBoolean(key: AsyncStorageKey): Promise<boolean | null> {
    const value: string | null = await this.getString(key);
    return value ? JSON.parse(value) : null;
  }

  static async getString(key: AsyncStorageKey): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  static async saveString(key: AsyncStorageKey, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }

  static async get<T>(key: AsyncStorageKey): Promise<T | null> {
    const value: string | null = await this.getString(key);
    return value ? JSON.parse(value) : null;
  }

  static async save<T>(key: AsyncStorageKey, value: T): Promise<void> {
    return this.saveString(key, JSON.stringify(value));
  }

  static async remove(key: AsyncStorageKey): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  static async clearStorage(): Promise<void> {
    return AsyncStorage.clear();
  }

  static async doOnLogout(): Promise<void> {
    const allKeys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiRemove(allKeys);
  }
}
