import { it, describe, afterEach, expect } from "vitest";
import { LocalStorageWrapper } from "../LocalStorageWrapper";

afterEach(() => {
  localStorage.clear()
})

const setup = () => {
  return new LocalStorageWrapper()
}

describe('LocalStorageWrapper', () => {
  describe('has()', () => {
    it('should return true if item is present in localStorage', () => {
      const wrapper = setup()
      const hash = '123'

      localStorage.setItem(hash, '123')

      expect(wrapper.has(hash)).toBe(true)
    })

    it('should return false when there is no item in localStorage', () => {
      const wrapper = setup()
      const invalid = '123213'

      expect(wrapper.has(invalid)).toBe(false)
    })
  })

  describe('setItem()', () => {
    it('should correctly set the item', () => {
      const wrapper = setup()

      const hash = '123123'
      const value = '12321321321'

      wrapper.set(hash, value)

      expect(localStorage.getItem(hash)).toBe(value)
    })
  })

  describe('values()', () => {
    it('should correctly iterate over all values', () => {
      const wrapper = setup()

      const data = ['1', '2', '3']

      wrapper.set('hash1', data[0])
      wrapper.set('hash2', data[1])
      wrapper.set('hash3', data[2])

      for (const value of wrapper.values()) {
        expect(data).toContain(value)
      }
    })
  })

  describe('delete()', () => {
    it('should correctly delete items', () => {
      const wrapper = setup()

      const hash = 'hash'

      wrapper.set(hash, 'data')

      expect(wrapper.has(hash)).toBe(true)

      wrapper.delete(hash)

      expect(wrapper.has(hash)).toBe(false)
    })
  })
})