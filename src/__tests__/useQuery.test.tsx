import React, { ReactNode } from "react";
import { it, describe, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "./setup/server";
import { HttpResponse, http } from "msw";
import { useQuery } from "../useQuery";
import { Client, QueryClientProvider } from "..";

type SuccessData = {
  abc: string;
};

const TEST_URL = "https://localhost:9000/";
const ERROR_URL = "https://localhost:5000/";
const SUCCESS_DATA: SuccessData = {
  abc: "abc",
};

describe("useQuery", () => {
  it("should correctly return mocked network request data", async () => {
    server.use(
      http.get(TEST_URL, () => {
        return HttpResponse.json(SUCCESS_DATA);
      })
    );

    const { result } = renderHook(() => useQuery<SuccessData>(TEST_URL), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={new Client()}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() =>
      expect(result.current.data).toMatchObject(SUCCESS_DATA)
    );
    await waitFor(
      () =>
        expect(JSON.parse(localStorage.getItem(TEST_URL) || "").data)
          .toHaveProperty
    );
  });

  it("should correctly return error", async () => {
    server.use(
      http.get(ERROR_URL, () => {
        return new HttpResponse(null, {
          status: 404,
        });
      })
    );

    const { result } = renderHook(() => useQuery<SuccessData>(ERROR_URL), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={new Client()}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    await waitFor(
      () =>
        expect(JSON.parse(localStorage.getItem(ERROR_URL) || "").data)
          .toHaveProperty
    );
  });
});
