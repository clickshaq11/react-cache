import { Store } from "./store";

export class Cache {
  #store: Store;

  constructor(store?: Store) {
    this.#store = store ?? new Map<string, string>();
  }

  get(hash: string) {
    return this.#store.get(hash);
  }

  add() {

  }
}
