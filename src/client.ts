import { Cache } from "./cache";

export class Client {
  #cache: Cache;

  constructor() {
    this.#cache = new Cache();
  }

  mount() {}
  unmount() {}
}
