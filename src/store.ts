export type Store = {
  has: (queryHash: string) => boolean;
  set: (queryHash: string, query: string) => void;
  get: (queryHash: string) => string | undefined;
  delete: (queryHash: string) => void;
  values: () => IterableIterator<string>;
};
