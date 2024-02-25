export class LocalStorageWrapper {
  has(hash: string) {
    return localStorage.getItem(hash) === null;
  }
  set(hash: string, query: string) {
    localStorage.setItem(hash, query);
  }
  get(hash: string): string {
    return localStorage.getItem(hash) || "";
  }
  delete(hash: string) {
    localStorage.removeItem(hash);
  }
  *values(): IterableIterator<string> {
    for (let i = 0, len = localStorage.length; i < len; ++i) {
      yield localStorage.getItem(localStorage.key(i) || "") || "";
    }
  }
}
