import { setActivePinia, createPinia } from "pinia"
import { useAuthStore } from "@/stores/auth"
import { beforeEach, describe, expect, it, vi } from "vitest"
vi.mock("@/client/api", () => ({
  getToken: vi.fn().mockResolvedValue("token"),
}))

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("sets timeStamp and token after call refreshToken", async () => {
    const auth = useAuthStore()
    expect(auth.timeStamp).toBe(null)
    await auth.refreshToken()
    expect(auth.timeStamp).toBeTruthy()
    expect(auth.token).toBe("token")
  })
})
