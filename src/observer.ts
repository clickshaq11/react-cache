import { Client } from "./client";
import { Query } from "./query";
import { isQueryTimeReached } from "./utils";

type Listener = () => void;
type State = "Loading" | "Failure" | "Success" | "Stale";

export class Observer<TData extends object> {
  private listeners: Set<Listener>;
  private readonly url: string;
  private readonly client: Client;
  private currentResult: TData = undefined!;
  private state: State = "Stale";

  constructor(client: Client, url: string) {
    this.client = client;
    this.url = url;
    this.listeners = new Set();
    this.bindMethods();

    this.fetcher(url).then((data) => {
      this.updateResult(data);
    });
  }

  protected bindMethods() {
    this.updateResult.bind(this);
    this.getCurrentResult.bind(this);
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    this.onSubscribe();

    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }

  protected onSubscribe() {
    const cachedValue = this.client.getCache().get<Query<TData>>(this.url);

    if (this.state === "Loading") {
      return;
    }

    if (!cachedValue) {
      this.fetcher(this.url).then((data) => {
        this.updateResult(data);
      });

      return;
    }

    if (
      !isQueryTimeReached(cachedValue.timeCompleted, this.client.getCacheTime())
    ) {
      return;
    }

    this.client.getCache().delete(this.url);

    this.fetcher(this.url).then((data) => {
      this.updateResult(data);
    });
  }

  protected onUnsubscribe() {}

  updateResult(data: TData) {
    this.client.getCache().add(this.url, new Query(data));
    this.currentResult = this.client
      .getCache()
      .get<Query<TData>>(this.url).data;
    this.listeners.forEach((listener) => listener());
  }

  protected fetcher(url: string) {
    this.state = "Loading";
    const promise = fetch(url);

    return promise
      .then((data) => {
        this.state = "Success";
        return data.json();
      })
      .catch(() => {
        this.state = "Failure";
      });
  }

  getCurrentResult() {
    return this.currentResult;
  }
}
