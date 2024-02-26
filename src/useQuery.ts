import * as React from "react";
import { useQueryClient } from "./ClientProvider";
import { Observer } from "./observer";

// TODO: Change type
type Result = object;

export function useQuery<TResult extends object = Result>(url: string) {
  const client = useQueryClient();

  const [observer] = React.useState(() => new Observer<TResult>(client, url));

  const result = observer.getCurrentResult();

  React.useSyncExternalStore(
    (onStoreChange) => observer.subscribe(onStoreChange),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );

  return result;
}
