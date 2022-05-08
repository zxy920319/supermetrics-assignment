import DashboardContent from "@/components/DashboardContent.vue"
import { shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe("DashboardContent", () => {
  it("renders component", () => {
    const wrapper = shallowMount(DashboardContent)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
