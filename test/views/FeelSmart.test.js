import FeelSmart from "@/views/FeelSmart.vue"
import { createTestingPinia } from "@pinia/testing"
import { config, flushPromises, shallowMount } from "@vue/test-utils"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { useAnalysisStore } from "@/stores/analysis"

describe("FeelSmart", () => {
  const analysis = {
    posts: [
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
    ],
    fetchAllPosts: vi.fn(),
  }
  const formatDateTime = () => ""
  const render = () => {
    return shallowMount(FeelSmart, {
      global: {
        plugins: [createTestingPinia({ initialState: { auth: { token: "token" }, analysis }, createSpy: vi.fn })],
        provide: { formatDateTime },
      },
    })
  }

  beforeAll(() => {
    config.renderStubDefaultSlot = true
  })

  afterAll(() => {
    config.renderStubDefaultSlot = false
  })

  it("calls fetchAllPosts on mounted", async () => {
    const wrapper = await render()
    await flushPromises()
    const analysisStore = useAnalysisStore()

    expect(wrapper.html()).toMatchSnapshot()
    expect(analysisStore.fetchAllPosts).toHaveBeenCalledWith({ sl_token: "token" })
    expect(wrapper.vm.loading).toBe(false)
  })

  it("generates users from posts", async () => {
    const wrapper = await render()
    await flushPromises()

    expect(wrapper.vm.users.size).toEqual(7)
    expect(wrapper.vm.users.get("user_12")).toEqual([
      expect.anything(),
      expect.objectContaining({
        from_name: "Lashanda Small",
        from_id: "user_12",
      }),
    ])
  })

  it("generates usersInfo from users", async () => {
    const wrapper = await render()
    await flushPromises()

    expect(wrapper.vm.usersInfo.length).toEqual(7)
    expect(wrapper.vm.usersInfo[0].name).toEqual("John Doe")
    expect(wrapper.vm.usersInfo[0].total).toEqual(2)
    expect(wrapper.vm.usersInfo[0].averageLength).toEqual(179)
    expect(wrapper.vm.usersInfo[0].byMonth.length).toEqual(1)
  })
})
