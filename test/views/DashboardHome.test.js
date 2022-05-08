import DashboardHome from "@/views/DashboardHome.vue"
import { describe, expect, it, vi } from "vitest"
import { flushPromises, mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import { getPosts } from "@/client/api"

vi.mock("@/client/api", () => ({
  getPosts: vi.fn().mockResolvedValue([]),
}))
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe("DashboardHome", async () => {
  const render = () => {
    return mount(DashboardHome, {
      global: {
        plugins: [createTestingPinia({ initialState: { auth: { token: "token" } }, createSpy: vi.fn })],
      },
    })
  }

  it("calls fetchPosts on mounted", async () => {
    const wrapper = await render()
    await flushPromises()
    const params = { sl_token: "token", page: 1 }
    expect(getPosts).toHaveBeenCalledWith(params)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
