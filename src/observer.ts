import { Client } from "./client";

type Listener = () => void;

export class Observer {
  #listeners: Set<Listener>;
  #url: string;
  #client: Client;
  #currentResult: any;

  constructor(client: Client, url: string) {
    this.#client = client;
    this.#url = url;
    this.#listeners = new Set();
  }

  subscribe(listener: Listener): () => void {
    this.#listeners.add(listener);

    this.onSubscribe();

    return () => {
      this.#listeners.delete(listener);
      this.onUnsubscribe();
    };
  }

  protected onSubscribe() {
    this.fetcher(this.#url);
  }

  protected onUnsubscribe() {}

  protected updateResult() {}

  protected fetcher(url: string) {
    // TODO change any to type
    let promise: Promise<any> = fetch(url);

    return promise;
  }

  getCurrentResult() {
    return this.#currentResult;
  }
}
