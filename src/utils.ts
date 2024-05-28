export function isQueryTimeReached(queryTime: number, cacheTime: number) {
  return queryTime + cacheTime < Date.now();
}
