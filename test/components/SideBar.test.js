import SideBar from "@/components/SideBar.vue"
import { shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe("SideBar", () => {
  it("renders component", () => {
    const wrapper = shallowMount(SideBar, {
      global: {
        stubs: ["FontAwesomeIcon", "router-link"],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
