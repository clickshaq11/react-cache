import { it, describe, expect } from "vitest";
import { Client } from "../client";


describe('client', () => {
  it('should set cache time for 60 seconds by default', () => {
    const client = new Client()

    expect(client.getCacheTime()).toBe(60 * 1000)
  })
})