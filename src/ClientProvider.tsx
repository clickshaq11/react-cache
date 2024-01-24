import React, { useContext, createContext, useEffect, ReactNode } from "react";
import { Client } from "./client";

export const QueryClientContext = createContext<Client | undefined>(undefined);

export const useQueryClient = (queryClient?: Client) => {
  const client = useContext(QueryClientContext);

  if (queryClient) {
    return queryClient;
  }

  if (!client) {
    throw new Error("Provide proper client");
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
}: QueryClientProviderProps): JSX.Element => {
  useEffect(() => {
    client.mount();
    return client.unmount;
  }, [client]);

  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};
