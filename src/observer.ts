import { Client } from "./client";
import { Query } from "./query";
import { isQueryTimeReached } from "./utils";

type Listener = () => void;
type State = "Loading" | "Failure" | "Success" | "Stale";
type CurrentState<T> = {
  data: T;
  error: Error;
  isError: boolean;
  isSuccess: boolean;
};

export class Observer<TData extends object> {
  private listeners: Set<Listener>;
  private readonly url: string;
  private readonly client: Client;
  private currentResult: CurrentState<TData> = undefined!;
  private state: State = "Stale";
  private error: Error = undefined!;

  constructor(client: Client, url: string) {
    this.client = client;
    this.url = url;
    this.listeners = new Set();
    this.bindMethods();

    if (this.client.getCache().has(url)) {
      this.currentResult = this.client.getCache().get(url);
      return;
    }

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

  protected buildResult(): CurrentState<TData> {
    return {
      data: this.client.getCache().get<Query<TData>>(this.url).data,
      error: this.error,
      isError: this.state === "Failure",
      isSuccess: this.state === "Success",
    };
  }

  updateResult(data: TData) {
    console.log(this.state);
    this.client.getCache().add(this.url, new Query(data));
    this.currentResult = this.buildResult();
    this.listeners.forEach((listener) => listener());
  }

  protected fetcher(url: string) {
    this.state = "Loading";
    const promise = fetch(url);

    return promise
      .then((data) => {
        if (data.status >= 400) {
          throw new Error(
            `Error while fetching url ${this.url}: ${this.error}`
          );
        }
        this.state = "Success";
        return data.json();
      })
      .catch((err) => {
        this.state = "Failure";
        this.error = err;
      });
  }

  getCurrentResult() {
    return this.currentResult;
  }
}
