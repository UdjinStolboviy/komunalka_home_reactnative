import { AuthUser } from '../storage/auth/auth.user.model';
import { AsyncStorageKey } from './AsyncStorageKey';
import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();



export class AsyncStorageFacade {
  
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

 
  static  get (key: AsyncStorageKey): string | null{
    const value: string | undefined = storage.getString(key)
    return value ?? null;
  }

  static remove(key: AsyncStorageKey): void {
    storage.delete(key)
  }
  
  static  clearStorage(): void {
    storage.clearAll();
    
  }

  //------------------------

  static  getNumber(key: AsyncStorageKey): number | null {
    const value: number | undefined = storage.getNumber(key);
    return value ?? null;
  }


  static  save (key: AsyncStorageKey, value: string | number | boolean | Uint8Array): void {
    storage.set(key, value);
  }

  
}
