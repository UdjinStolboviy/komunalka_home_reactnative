export interface IAsyncStorage {
  save(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
  clearAll(): Promise<void>;
  clearKeys(keys: string[]): Promise<void>;
}
