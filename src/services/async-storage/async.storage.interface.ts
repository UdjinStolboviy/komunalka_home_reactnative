export interface IAsyncStorage {
  save(key: string, value: string): void;
  get(key: string): string | null;
  remove(key: string): void;
  clearAll(): void;
  clearKeys(keys: string[]): void;
}
