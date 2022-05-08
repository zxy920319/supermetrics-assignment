import { setActivePinia, createPinia } from "pinia"
import { useAnalysisStore } from "@/stores/analysis"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { getAllPosts } from "@/client/api"

vi.mock("@/client/api", () => ({
  getAllPosts: vi.fn().mockResolvedValue([]),
}))

describe("Analysis Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("does not call getAllPosts if posts exists", async () => {
    const analysis = useAnalysisStore()
    analysis.posts = []

    await analysis.fetchAllPosts()
    expect(getAllPosts).not.toHaveBeenCalled()
  })

  it("sets posts after call fetchAllPosts", async () => {
    const analysis = useAnalysisStore()
    await analysis.fetchAllPosts()

    expect(analysis.posts).toEqual([])
  })
})
