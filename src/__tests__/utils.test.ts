import { it, describe, afterEach, vi, expect } from "vitest";
import { isQueryTimeReached } from "../utils";


afterEach(() => {
  vi.useRealTimers()
})

describe('utils', () => {
  describe('isQueryTimeReached', () => {
    it('should return false when time is not yet reached', () => {
      vi.useFakeTimers()

      const time = 1708966183

      vi.setSystemTime(time)

      expect(isQueryTimeReached(time, 60 * 1000)).toBe(false)
    })

    it('should return true when time is already reached', () => {
      vi.useFakeTimers()

      const time = 1708966183

      vi.setSystemTime(time)

      expect(isQueryTimeReached(time - 60 * 1000 - 1, 60 * 1000)).toBe(true)
    })
  })
})