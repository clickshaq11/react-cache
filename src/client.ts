import { Cache } from "./cache";
import { LocalStorageWrapper } from "./LocalStorageWrapper";

type ClientOptions = {
  cacheTimeMs: number;
  useLocalStorage: boolean;
};

const defaultOptions: ClientOptions = {
  cacheTimeMs: 60 * 1000,
  useLocalStorage: true,
};

export class Client {
  private readonly cache: Cache;
  private readonly cacheTimeMs: number = 3 * 1000;

  constructor(options = defaultOptions) {
    const { cacheTimeMs, useLocalStorage } = options;
    if (useLocalStorage) {
      this.cache = new Cache(new LocalStorageWrapper());
    } else {
      this.cache = new Cache();
    }
    this.cacheTimeMs = cacheTimeMs;
  }

  getCache() {
    return this.cache;
  }

  getCacheTime() {
    return this.cacheTimeMs;
  }

  mount() {}

  unmount() {}
}
