import { getToken, getPosts, getAllPosts } from "@/client/api"
import { get, post, getPaginated } from "@/client"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { createPinia, setActivePinia } from "pinia"

vi.mock("@/client", () => ({
  get: vi.fn(),
  post: vi.fn(),
  getPaginated: vi.fn(),
}))

describe("@/client", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("API", () => {
    it("getToken works as expected", () => {
      getToken()
      expect(post).toHaveBeenCalledWith("/register", expect.anything(), {}, true)
    })
    it("getPosts works as expected", () => {
      getPosts({})
      expect(get).toHaveBeenCalledWith("/posts", { params: {} })
    })
    it("getPosts works as expected", () => {
      getAllPosts({})
      expect(getPaginated).toHaveBeenCalledWith("/posts", {})
    })
  })
})
