export function isQueryTimeReached(queryTime: number, cacheTime: number) {
  console.log(queryTime, cacheTime, Date.now());
  return queryTime + cacheTime < Date.now();
}
