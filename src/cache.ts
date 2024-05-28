import { Store } from "./store";

export class Cache {
  private readonly store: Store;

  constructor(store?: Store) {
    this.store = store ?? new Map<string, string>();
  }

  has(hash: string) {
    return this.store.has(hash);
  }

  get<Type>(hash: string): Type {
    const result = this.store.get(hash);

    if (!result) {
      return result as Type;
    }

    return JSON.parse(result) as Type;
  }

  add<Type>(hash: string, value: Type) {
    this.store.set(hash, JSON.stringify(value));
  }

  delete(hash: string) {
    this.store.delete(hash);
  }
}
