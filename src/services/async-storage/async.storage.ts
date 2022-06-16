import { IAsyncStorage } from "./async.storage.interface";
import { inject, injectable } from "inversify";


import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { TYPES } from "app/data/ioc/types";
import { ILoggerService } from "../logger/main/logger.service.interface";

@injectable()
export class AsyncStorage implements IAsyncStorage {

  @inject(TYPES.Logger) private logger: ILoggerService;


  public async save(key: string, value: string): Promise<void> {
    try {
      await ReactNativeAsyncStorage.setItem(key, value)
    } catch (e) {
      this.logger.error("Could not save value --> ", key);
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      return await ReactNativeAsyncStorage.getItem(key);
    } catch (e) {
      this.logger.error("Could not get value --> ", key);
      return null
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      await ReactNativeAsyncStorage.removeItem(key);
    } catch (e) {
      this.logger.error("Could not remove value --> ", key);
    }
  }

  public async clearAll(): Promise<void> {
    try {
      await ReactNativeAsyncStorage.clear();
    } catch (e) {
      this.logger.error("Could not clear async storage");
    }
  }

  public async clearKeys(keys: string[]): Promise<void> {
    try {
      await Promise.all(keys.map(async key => {
        await ReactNativeAsyncStorage.removeItem(key);
      }));
    } catch (e) {
      this.logger.error("Could not clear async storage", e);
    }
  }

}
