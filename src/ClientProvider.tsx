import * as React from "react";
import { createContext, ReactNode, useContext } from "react";
import { Client } from "./client";

export const QueryClientContext = createContext<Client | undefined>(undefined);

export const useQueryClient = () => {
  const client = useContext(QueryClientContext);

  if (!client) {
    throw new Error("Provide query client");
  }

  return client;
};

export type QueryClientProviderProps = {
  client: Client;
  children?: ReactNode;
};

export const QueryClientProvider = ({
  client,
  children,
}: QueryClientProviderProps) => {
  // useEffect(() => {
  //   client.mount();
  //   return client.unmount;
  // }, [client]);

  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};
