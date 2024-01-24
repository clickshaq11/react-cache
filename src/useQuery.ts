import { useSyncExternalStore, useState, useCallback } from "react";
import { useQueryClient } from "./ClientProvider";
import { Observer } from "./observer";

// TODO: Change type
type Result = {};

export function useQuery<TQueryKey = string>(url: TQueryKey): Result;

export function useQuery(url: string) {
  const client = useQueryClient();

  const [observer] = useState(() => new Observer(client, url));

  const result = observer.getCurrentResult();

  useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        const unsubscribe = observer.subscribe(onStoreChange);
        return unsubscribe;
      },
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );

  return result;
}
