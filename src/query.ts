import { Cache } from "./cache";
import { Observer } from "./observer";

export class Query<Data> {
  queryHash: string;
  state: QueryState<TData, TError>;

  #initialState: QueryState<TData, TError>;
  #cache: Cache;
  #promise?: Promise<Data>;
  #observers: Observer[];

  constructor(config: QueryConfig<TQueryFnData, TError, TData, TQueryKey>) {
    this.#observers = []
    this.#cache = config.cache
    this.queryHash = config.queryHash
    this.#initialState = config.state || getDefaultState(this.options)
    this.state = this.#initialState
    this.scheduleGc()
  }
}
