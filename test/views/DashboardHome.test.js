import DashboardHome from "@/views/DashboardHome.vue"
import { describe, expect, it, vi } from "vitest"
import { flushPromises, mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import { getPosts } from "@/client/api"

vi.mock("@/client/api", () => ({
  getPosts: vi.fn().mockResolvedValue([
    {
      from_name: "John Doe",
      from_id: "user_3",
      message: "some message",
    },
    {
      from_name: "Leonarda Schult",
      from_id: "user_3",
      message:
        "gradient wrestle interest prescription hallway beautiful fireplace bell diameter abstract rally leader achievement porter trail gift core litigation executive horseshoe confront sow hike stride era radio generation resident virtue irony rape generate transport contraction sweet delicate band contrary balance publisher national marriage deserve",
    },
    {
      from_name: "Yolande Urrutia",
      from_id: "user_15",
      message:
        "process siege name mess situation porter suggest racism romantic unfair shell serve body visible slab disaster loose meadow turkey allocation favor food accident correspond counter virgin parachute spend situation restrict civilian proposal grandmother brake deposit good broken sunshine crusade hate bolt margin introduce memorandum printer correspond belief planet sigh far animal act bolt introduction diameter mayor value mastermind",
    },
    {
      from_name: "Lashanda Small",
      from_id: "user_12",
      message: "1",
    },
    {
      from_name: "Lashanda Small",
      from_id: "user_12",
      message: "2",
    },
    {
      from_name: "Ethelene Maggi",
      from_id: "user_18",
      message: "3",
    },
    {
      from_name: "Woodrow Lindholm",
      from_id: "user_14",
      message: "4",
    },
    {
      from_name: "Rosann Eide",
      from_id: "user_9",
      message: "5",
    },
    {
      from_name: "Ethelene Maggi",
      from_id: "user_18",
      message: "6",
    },
    {
      from_name: "Woodrow Lindholm",
      from_id: "user_14",
      message: "7",
    },
    {
      from_name: "Regenia Boice",
      from_id: "user_13",
      message: "8",
    },
  ]),
}))

describe("DashboardHome", async () => {
  const formatDateTime = () => ""
  const render = () => {
    return mount(DashboardHome, {
      global: {
        plugins: [createTestingPinia({ initialState: { auth: { token: "token" } }, createSpy: vi.fn })],
        provide: { formatDateTime },
      },
    })
  }

  it("calls getPosts on mounted", async () => {
    const wrapper = await render()
    await flushPromises()
    const params = { sl_token: "token", page: 1 }
    expect(getPosts).toHaveBeenCalledWith(params)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("calls getPosts on pagination change", async () => {
    const wrapper = await render()
    await flushPromises()

    await wrapper.find(".ant-pagination-item-2").trigger("click")
    const params = { sl_token: "token", page: 2 }
    expect(wrapper.vm.pagination.current).toEqual(2)
    expect(getPosts).toHaveBeenCalledWith(params)
  })
})
